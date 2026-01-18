import { getAuthSession } from '@/lib/auth'

// Backend API base URL - update this with your actual backend URL
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001/api'

export async function GET(request) {
  try {
    const session = await getAuthSession()
    
    if (!session || !session.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Call your backend API to get user profile
    const response = await fetch(`${BACKEND_API_URL}/user/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.user.id}`, // Or use session token
        // Add any other headers your backend requires
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return Response.json(
        { error: errorData.message || 'Failed to fetch user profile' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const session = await getAuthSession()
    
    if (!session || !session.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Prepare user profile data from Google OAuth session
    const userProfileData = {
      email: session.user.email,
      name: session.user.name,
      picture: session.user.picture,
      googleId: session.user.id,
      ...body, // Allow additional fields from request body
    }

    // Call your backend API to create/update user profile
    const response = await fetch(`${BACKEND_API_URL}/user/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.user.id}`,
      },
      body: JSON.stringify(userProfileData),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return Response.json(
        { error: errorData.message || 'Failed to create/update user profile' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error('Error creating/updating user profile:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request) {
  try {
    const session = await getAuthSession()
    
    if (!session || !session.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Call your backend API to update user profile
    const response = await fetch(`${BACKEND_API_URL}/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.user.id}`,
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return Response.json(
        { error: errorData.message || 'Failed to update user profile' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error('Error updating user profile:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

