import { getServerSession } from 'next-auth/next'

// This should match your NextAuth configuration
// For NextAuth v4, getServerSession() works without options in App Router
// However, we need to import the auth options if available
export async function getAuthSession() {
  try {
    // In Next.js App Router, getServerSession() can work without options
    // but if you have custom auth configuration, you might need to pass it
    const session = await getServerSession()
    return session
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

