'use client'

import { z } from 'zod'

export const FormRegister = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    fetch('/api/auth/register', {
      method: 'POST',
      body: formData
    })

      .then(async response => {
        if (!response.ok) {
          throw new Error('Error al registrarse')
        }
        return await response.json()
      })

      .then(_ => {
        console.log('Regristro exitoso')
      })

      .catch(error => {
        console.error('Error al registrase', z.string().parse(error?.message ?? 'Error desconocido'))
      })
  }
  return (
    <div>
      <div className='flex flex-col items-center justify-center p-2'>
        <h1 className='font-bold text-2xl'>Registrate</h1>
        <p className='font-semibold text-lg'>Ingresa tus datos para crear una cuenta</p>
      </div>
      <form onSubmit={handleSubmit} className='space-y-4 flex flex-col'>
        <label className='text-sm'>Nombre</label>
        <input className='bg-gray-100 border-gray-300 text-gray-800 placeholder:text-gray-500 rounded' type='text' name='first_name' placeholder='Juan' />
        <label className='text-sm'>Apellido</label>
        <input className='bg-gray-100 border-gray-300 text-gray-800 placeholder:text-gray-500 rounded' type='text' name='last_name' placeholder='Hernandez' />
        <label className='text-sm'>Correo</label>
        <input className='bg-gray-100 border-gray-300 text-gray-800 placeholder:text-gray-500 rounded' type='email' name='email' placeholder='example@gmail,com' />
        <label className='text-sm'>Contraseña</label>
        <input className='bg-gray-100 border-gray-300 text-gray-800 placeholder:text-gray-500 rounded' type='password' name='passeword' placeholder='*******' />
        <label className='text-sm'>Telefono</label>
        <input className='bg-gray-100 border-gray-300 text-gray-800 placeholder:text-gray-500 rounded' type='text' name='phone_number' placeholder='+(52) 123 456 789  ' />
        <button type='submit'>Registrarse</button>
      </form>
    </div>
  )
}
