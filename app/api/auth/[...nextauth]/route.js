import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// Backend API base URL - update this with your actual backend URL
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3001/api'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Add user ID to session
      if (session.user) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async signIn({ user, account, profile }) {
      // Create or update user profile in your backend when user signs in with Google
      if (account?.provider === 'google' && user) {
        try {
          // Check if phone exists in profile or user object, otherwise send empty string
          console.log('profile', profile)
          const phoneNumber = profile?.phone || user?.phone || ''
          
          const userProfileData = {
            email: user.email,
            name: user.name,
            picture: user.image,
            userId: user.id,
            phone: phoneNumber, // Send phone if available, else empty string
            // Add any other fields you want to send to your backend
          }

          // Call your backend API to create/update user profile
          const response = await fetch(`${BACKEND_API_URL}/user/profile`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userProfileData),
          })

          if (!response.ok) {
            console.error('Failed to create/update user profile in backend')
            // You can choose to allow sign-in even if backend call fails
            // or return false to prevent sign-in
            // return false
          } else {
            const data = await response.json()
            console.log('User profile created/updated:', data)
          }
        } catch (error) {
          console.error('Error creating/updating user profile:', error)
          // You can choose to allow sign-in even if backend call fails
          // or return false to prevent sign-in
          // return false
        }
      }
      return true
    },
  },
  pages: {
    signIn: '/home', // Custom sign-in page if needed
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }

