import { getServerSession } from 'next-auth/next'

// This should match your NextAuth configuration
// For NextAuth v4, getServerSession() works without options in App Router
export async function getAuthSession() {
  try {
    return await getServerSession()
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

