import { NextResponse } from 'next/server'

// Optional: validate against env (e.g. ADMIN_EMAIL, ADMIN_PASSWORD)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body || {}

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      )
    }

    // Replace with your auth logic (e.g. database, backend API, or env check)
    if (ADMIN_EMAIL && ADMIN_PASSWORD) {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // TODO: set admin session cookie or JWT and return success
        return NextResponse.json({ success: true })
      }
    }

    return NextResponse.json(
      { error: 'Invalid email or password.' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
