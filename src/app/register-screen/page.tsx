'use client'
import React from "react";

export default function FormRegister() {
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

            const formData = new FormData (e.currentTarget);

        fetch ('/api/auth/register',{
            method: 'POST',
            body: formData,
            })
 
            .then (response => {
                if (!response.ok) {
                    throw new Error('Error al registrarse');
                }
                return response.json();
            })

            .then (data => {
                console.log ('Regristro exitoso');
            })

            .catch (error => {
                console.error('Error al registrase', error.message || 'Error desconocido');
            })            
        }
return (
    <div>
        <div className="flex flex-col items-center justify-center p-2">
        <h1 className="font-bold text-2xl">Registrate</h1>
        <p className="font-semibold text-lg">Ingresa tus datos para crear una cuenta</p>    
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
            <label className="text-sm">Nombre</label>
                <input className="bg-gray-100 border-gray-300 text-gray-800 placeholder:text-gray-500 rounded" type="text" name="first_name" placeholder="Juan"></input>
            <label className="text-sm">Apellido</label>
                <input className="bg-gray-100 border-gray-300 text-gray-800 placeholder:text-gray-500 rounded" type="text" name="last_name" placeholder="Hernandez"></input>
            <label className="text-sm">Correo</label>
                <input className="bg-gray-100 border-gray-300 text-gray-800 placeholder:text-gray-500 rounded" type="email" name="email" placeholder="example@gmail,com" ></input>
            <label className="text-sm">Contraseña</label>
                <input className="bg-gray-100 border-gray-300 text-gray-800 placeholder:text-gray-500 rounded"type="password" name="passeword" placeholder="*******"></input>
            <label className="text-sm">Telefono</label>
                <input className="bg-gray-100 border-gray-300 text-gray-800 placeholder:text-gray-500 rounded" type="text" name="phone_number" placeholder="+(52) 123 456 789  "></input>
            <button type="submit">Registrarse</button>
        </form> 
    </div>
        )   
}
