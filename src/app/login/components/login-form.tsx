'use client'

import Image from 'next/image'
import { useState } from 'react'
import Login from '../API/login'

export const LoginForm = () => {
  const [err, setErr] = useState<null | string>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setErr(null)

    Login(
      form
    ).then((data) => {
      console.log('Login successful:', data)
    }).catch((err) => {
      console.error('Login failed:', err)
      setErr(err.message)
    })
  }

  return  (

<div className="grid grid-cols-2 h-screen w-full">
<div className="relative hidden md:block">
    <Image
        src="vercel.svg"
        alt="Real Estate"
        className="h-full w-full object-cover"
        width={600}
        height={800}
        style={{ aspectRatio: '600/800', objectFit: 'cover' }}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-[#ffffff]/80 to-[#ffffff]/20"></div>
</div>
  <div className="flex items-center justify-center">
    <div className="w-full max-w-md space-y-6 px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="h-12 w-auto text-gray-600"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <a className="font-medium text-gray-600 hover:text-gray-500" href="#">
            start your 30-day free trial
          </a>
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
        <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
            htmlFor="email"
        >
            Email address or phone number
        </label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-5 w-5 text-gray-400"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </div>
            <input
              className="h-10 border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 block w-full rounded-md border-gray-300 pl-10 focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
              id="email"
              typeof="=email"
              required
              placeholder="Email address"
              type="email"
              name="email"
            />
          </div>
        </div>
        <div>
        <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
            htmlFor="password"
        >
            Password
        </label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-5 w-5 text-gray-400"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <input
                className="h-10 border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 block w-full rounded-md border-gray-300 pl-10 focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                id="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                type="password"
                name="password"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              role="checkbox"
              aria-checked="false"
              data-state="unchecked"
              value="on"
              className="peer shrink-0 border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground h-4 w-4 rounded text-gray-600 focus:ring-gray-500"
              id="remember-me"
            ></button>
            
          </div>
          <div className="text-sm">
            <a className="font-medium text-gray-600 hover:text-gray-500" href="#">
              Forgot your password?
            </a>
          </div>
        </div>
        <div>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-full rounded-md bg-gray-600 py-2 px-4 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            type="submit"
          >
            Sign in
          </button>
          {err != null && <p id='paragraph-error' className='text-red-500'>{err}</p>}
        </div>
      </form>
    <div className="mt-6 text-center text-sm">
        <span className="text-gray-500">Dont have an account?</span>{" "}
        <a className="font-medium text-gray-600 hover:text-gray-500" href="/login/register">
            Register
        </a>
    </div>
  </div>
</div>
</div>

  )
}