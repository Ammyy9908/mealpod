import { getAuthSession } from '@/lib/auth'
import { cookies } from 'next/headers'

// Backend API base URL - update this with your actual backend URL
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3001/api'

export async function GET(request) {
  try {
    const session = await getAuthSession()
    
    if (!session || !session.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get access_token from cookies
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value

    if (!accessToken) {
      return Response.json({ error: 'Access token not found' }, { status: 401 })
    }

    // Call your backend API to get user addresses
    const response = await fetch(`${BACKEND_API_URL}/user/subscription`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return Response.json(
        { error: errorData.message || 'Failed to fetch addresses' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error('Error fetching addresses:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}