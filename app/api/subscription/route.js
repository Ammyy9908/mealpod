import { getItem } from '../../../services/bin.js'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('product_id')
  try {
    const data = await getItem(productId)
    return Response.json(data)
  } catch (error) {
    console.error('Error fetching subscription:', error)
    
    // Return appropriate status code based on error
    const statusCode = error.response?.status || 500
    const errorMessage = error.message || 'Failed to fetch subscriptions'
    
    return Response.json(
      { error: errorMessage },
      { status: statusCode }
    )
  }
}

