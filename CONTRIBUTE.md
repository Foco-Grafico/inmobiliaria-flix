## Tasks:
### Fron-End:
- [ ] Middleware:
    - Limitar pagina
    - Validar usuario

- [ ] Pagina de login (/auth/login)
    - [ ] La pagina de login debe permitir al usuario logearse y guardar un identificador hash unico en las cookies para permitir la recuperacion de la cuenta y validar el loggeo
    - [ ] El formulario debe contaner un enlace que te permita ir al (/auth/register)

- [ ] Pagina de registro (/auth/register)
    - [ ] La pagina de registro debe permitir al usuario crear una cuenta y guardar la información en la base de datos
    - [ ] El formulario debe contener campos para ingresar el nombre de usuario, correo electrónico, numero de telefono, localidad y contraseña
    - [ ] Debe haber una validación para asegurarse de que el correo electrónico sea único en la base de datos
    - [ ] La contraseña debe contar con doble validacion

- [ ] Pagina de inicio
    - [ ] Mostrar un banner publicitario (En caso de no haber publicidad pagada, mostrar un banner de FocoGrafico)
    - [ ] La pagina de inicio debe renderizar sliders con diferentes recomendaciones para el usuario en base a sus gustos
    - [ ] Debe tener una navbar
        - [ ] La navbar debe contar con una barra de busqueda y un boton de filtros
        - [ ] Debe mostrar el nombre del usuario y la imagen como boton, esto abrira un dropdown
        - [ ] Se debe mostrar el logo de la aplicacion

### Back-End:
- [ ] Auth:
    - [ ] GET: Obtener cuenta a travez de correo (o numero) y contraseña
    - [ ] GET: Obtener cuenta a travez de un token
    - [ ] POST: Crear cuenta -> TOKEN con EXPIRACION
- [ ] Database:
    - [ ] Conectar a la base de datos
    - [ ] Crear tablas necesarias
    - [ ] Realizar consultas y actualizaciones