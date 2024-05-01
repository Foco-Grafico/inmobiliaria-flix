import { APIENDPOINST } from "@/utils/API-CALLS/api-url"
import { redirect } from "next/navigation"

// ZOD

export default async function Login (form: FormData) {
    console.log('Login function called with email:', form.get('email'), 'and password:', form.get('password'))
  
    const response = await fetch(`${APIENDPOINST.postLoginPoint}`, {
      method: 'POST',
        body: form
    })
    console.log('Response:', response.status)
  
    const data = await response.json()
  
    console.log('Response Data:', data)
  
    if (!response.ok) {
      throw new Error(data.message)

    } else if (Number(data.status) === 200) {
      console.log('Login successful')
      redirect('/dashboard')
    }
  
    return data
    
  }
  