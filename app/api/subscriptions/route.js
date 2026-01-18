import { getSubscriptionsSku } from '../../../services/bin.js'

export async function GET() {
  try {
    const data = await getSubscriptionsSku()
    return Response.json(data)
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    
    // Return appropriate status code based on error
    const statusCode = error.response?.status || 500
    const errorMessage = error.message || 'Failed to fetch subscriptions'
    
    return Response.json(
      { error: errorMessage },
      { status: statusCode }
    )
  }
}

