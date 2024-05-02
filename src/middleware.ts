import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { z } from 'zod'

const isLogged = async ({
  req
}: {
  req: NextRequest
}) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('accept', 'application/json')

  const res = await fetch('http://localhost:3000/api/auth/is-logged', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      token: req.cookies.get('token')?.value ?? ''
    })
  })

  const json = await res.json()

  console.log(json)

  return z.boolean().parse(json.value)
}

// This function can be marked `async` if using `await` inside
export async function middleware (request: NextRequest) {
  const response = NextResponse.next()

  const { pathname } = request.nextUrl

  if (pathname === '/api') {
    return response
  }

  const isLoggedValue = await isLogged({ req: request })

  if (pathname === '/login' && isLoggedValue) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
}
