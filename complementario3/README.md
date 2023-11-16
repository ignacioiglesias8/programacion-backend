# Proyecto Final - React

Este es el repositorio del Proyecto Final de programación Backend. El proyecto tiene como objetivo la aprobación del curso impartido por Coderhourse. .


## Autor

Ignacio Iglesias

ignacioiglesias8@gmail.com


## Cuerpo docente

Profesor: Joaquín Cejas

Tutor: Lucas Cuevas


## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto localmente:

1. Clone el repositorio en tu máquina local:

        git clone https://github.com/ignacioiglesias8/programacion-backend.git

2. Navege al directorio del proyecto:

        cd programacion-backend/proyecto

3. Acceda a la carpeta src

	cd src

4. Instale nodemon en el ordenador en caso de no tenerlo:

        npm install -g nodemon

5. Inicie la aplicación:

        nodemon app.js

El proyecto se abrirá en el puerto http://localhost:8080.


## Direción local

http://localhost:8080/


## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

    proyecto/: Directorio contenedor de la aplicación.
    |
    |---public/: Directorio contenedor de carpetas y archivos estáticos.
    |    |
    |    |---css/: Directorio contenedor de archivos css.
    |    |   |
    |    |   |---chat.css: Stylesheet para la vista chat.
    |    |   |
    |    |   |---index.css: Stylesheet para la vista index.
    |    |   |
    |    |   |---products.css: Stylesheet para la vista products.
    |    |
    |    |---js/: Directorio contenedor de archivos js.
    |        |
    |        |---index.js: Script principal.
    |    
    |---src/: Directorio contenedor del código fuente de la aplicación.
    |    |
    |    |---config/: Directorio contenedor de archivos de configuración.
    |    |   |
    |    |   |--- passport.config.js: Archivo de configuración de passport. 
    |    |
    |    |---dao/: Directorio contenedor de managers.
    |    |   |
    |    |   |---db: 
    |    |   |   |
    |    |   |   |---models/:
    |    |   |   |   |
    |    |   |   |   |---carts.model.js: Esquema para gestionar db carts.  
    |    |   |   |   |
    |    |   |   |   |---messages.model.js: Esquema para gestionar db messages.
    |    |   |   |   |
    |    |   |   |   |---products.model.js: Esquema para gestionar db products.
    |    |   |   |   |
    |    |   |   |   |---users.model.js: Esquema para gestionar db users.
    |    |   |   |
    |    |   |   |---CartManagerDB.js: Configuración db del endpoint cart.
    |    |   |   | 
    |    |   |   |---ChatManagerDB.js: Configuración db del endpoint chat.
    |    |   |   | 
    |    |   |   |---ProductManagerDB.js: Configuración db del endpoint product.
    |    |   |   |
    |    |   |   |---UserManagerDB.js: Configuración db del endpoint user.
    |    |   |
    |    |   |---fs: 
    |    |       |
    |    |       |---CartManagerFS.js: Configuración de fs del endpoint cart.
    |    |       |
    |    |       |---ProductManagerFS.js: Configuración de fs del endpoint product.
    |    |
    |    |---functions/: Directorio contendor de funciones para backend
    |    |   |
    |    |   |---bcrypt.js: Configuración de funciones para crypto.
    |    |
    |    |---routers/: Directorio contenedor de los rutas.
    |    |   |
    |    |   |---routes/:
    |    |   |   |
    |    |   |   |---cart.js: Endpoint carts.   
    |    |   |   | 
    |    |   |   |---chat.js: Endpoint chat.js. 
    |    |   |   | 
    |    |   |   |---products.js: Endpoint products.
    |    |   |   |    
    |    |   |   |---sessions.js: Endpoint sessions.
    |    |   |       
    |    |   |---routes.router.js: Router de endpoints.
    |    |   |
    |    |   |---views.router.js: Router de vistas.
    |    |
    |    |---views/: Directorio contenedor de plantillas.
    |    |   |
    |    |   |---layouts/:
    |    |   |   |
    |    |   |   |---main.handlebars: Plantilla utilizada como marco principal.   
    |    |   |       
    |    |   |---cart.handlebars: Plantilla utilizada en la página cart.
    |    |   |
    |    |   |---chat.handlebars: Plantilla utilizada en la página chat.
    |    |   |
    |    |   |---index.handlebars: Plantilla utilizada en la página index.
    |    |   |        
    |    |   |---login.handlebars: Plantilla utilizada en la página login.
    |    |   |
    |    |   |---products.handlebars: Plantilla utilizada en página products.
    |    |   |
    |    |   |---register.handlebars: Plantilla utilizada en la página register.
    |    |
    |    |---app.js: Archivo que define la estructura y el comportamiento general de la interfaz de usuario.
    |    |
    |    |---products.json: Archivo contenedor del arreglo de productos.
    |    |
    |    |---utils.js: Archivo contenedor de funciones y utilidades genéricas.    
    |
    |---package-lock.json: Archivo contenedor sobre las dependencias de un proyecto.
    |    
    |---package.json: Archivo que configuración de Node.js para describir el proyecto y sus dependencias.   


## Endpoints y rutas:

1. Products (/api/products):

- Get ('/'): Obtiene la lista de productos.

- Get ('/:pid'): Obtiene el producto según id de producto (pid).

- Post ('/'): Agrega un producto a la lista generando id automaticamente.

	Campos obligatorios:

        "title": "",
        "description": "",
        "code": "",
        "price": "",
        "stock": "",
        "category": "",
        "thumbnails": []

	El status se agrega por defecto en true.

- Put ('/:pid'): Modifica un campo según id de producto (pid).

	Ejemplo:

		"title": "nuevo_valor"

- Delete ('/:pid'): Elimina el producto según id de producto (pid).

2. Cart (/api/carts):

- Post ('/'): Crea un carrito generando id automaticamente.

- Get ('/:cid'): Obtiene el carrito según id de producto (cid).

- Post ('/:cid/product/:pid'): Agrega a un carrito según su id (cid), el producto según id (pid).


## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork de este repositorio.

2. Crea una rama para tu nueva funcionalidad:

        git checkout -b nueva-funcionalidad

3. Realiza tus cambios y realiza commit de los mismos:

        git commit -m "Agregar nueva funcionalidad"

4. Envía tus cambios al repositorio remoto:

        git push origin nueva-funcionalidad

5. Abre una pull request en GitHub.


## Licencia

Este proyecto está bajo la licencia Warmi Sumaj Tours. Para más detalles, consulta el archivo LICENSE.

Por favor, ten en cuenta que este README es solo una plantilla inicial. Asegúrate de personalizarlo según las necesidades y características específicas de tu proyecto.