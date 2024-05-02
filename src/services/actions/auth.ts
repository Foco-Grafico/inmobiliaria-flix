'use server'

import { redirect } from "next/navigation";

export const Login = async (data: FormData) => {
    const response = await fetch('/api/login', {
        method: 'POST',
        body: data
    });

    const json = await response.json()
    
    
    const newPath = response.ok ? '/' : `/login?error=${json.detail ?? ''}`

    redirect(newPath)
}