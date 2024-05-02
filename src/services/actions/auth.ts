'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'

export const Login = async (data: FormData) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    body: data
  })

  const json = await response.json()

  const newPath = response.ok ? '/' : `/login?error=${z.string().parse(json.detail) ?? ''}`

  redirect(newPath)
}
