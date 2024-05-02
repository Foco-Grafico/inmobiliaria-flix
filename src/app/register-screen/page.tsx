export default function FormRegister() {
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData (e.currentTarget);

        fetch ('api/register'{
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
            
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="first_name" placeholder="Juan"></input>
            <input type="text" name="last_name" placeholder="Hernandez"></input>
            <input type="email" name="email" placeholder="example@gmail,com" ></input>
            <input type="password" name="passeword" placeholder="*******"></input>
            <input type="text" name="phone_number" placeholder="669122133"></input>
            <button type="submit">Registrarse</button>
        </form>
    )



        }

        }

