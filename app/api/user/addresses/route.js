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
    const response = await fetch(`${BACKEND_API_URL}/address`, {
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

export async function POST(request) {
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

    const body = await request.json()

    // Call your backend API to create new address
    const response = await fetch(`${BACKEND_API_URL}/address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return Response.json(
        { error: errorData.message || 'Failed to create address' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error('Error creating address:', error)
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

    // Get access_token from cookies
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value

    if (!accessToken) {
      return Response.json({ error: 'Access token not found' }, { status: 401 })
    }

    const body = await request.json()
    const { addressId, ...addressData } = body

    if (!addressId) {
      return Response.json(
        { error: 'Address ID is required' },
        { status: 400 }
      )
    }

    // Call your backend API to update address
    const response = await fetch(`${BACKEND_API_URL}/address/${addressId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(addressData),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return Response.json(
        { error: errorData.message || 'Failed to update address' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error('Error updating address:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request) {
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

    const { searchParams } = new URL(request.url)
    const addressId = searchParams.get('addressId')

    if (!addressId) {
      return Response.json(
        { error: 'Address ID is required' },
        { status: 400 }
      )
    }

    // Call your backend API to delete address
    const response = await fetch(`${BACKEND_API_URL}/address/${addressId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return Response.json(
        { error: errorData.message || 'Failed to delete address' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error('Error deleting address:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

