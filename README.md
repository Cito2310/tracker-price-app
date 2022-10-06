# TRACKER PRICE CAR
## ¿ Cual es la funcion de esta aplicacion ?
Esta aplicacion es un api rest que usa la tecnica de web scraping para obtener cierta informacion de autos en mercado libre para luego retornarlas segun el usuario


## API
### post /api/auth/register
Esta es ruta que necesaria para registrar un usuario.  
Por el *body* se pasan las propiedades: 
- *username* : LLeva el nombre de usuario
- *password* : LLeva la contraseña
- *email* : LLeva el correo

***

### get /api/auth/login
Esta es ruta que retornara el token necesario para tener acceso a otras rutas.  
Por el *body* se pasan las propiedades: 
- *username* : LLeva el nombre de usuario
- *password* : LLeva la contraseña

***

### get /api/trackerCars/:ID_USER
Esta es una ruta que retornara el usuario del ID_USER y los autos que tenga marcado.  
- Es necesario que en *ID_USER* sea el id de un usuario.

***

### put /api/user
Esta es una ruta que permite modificar un usuario.  
- Es necesario colocar en el *header* el token en la propiedad *token*.

***

### delete /api/user
Esta es una ruta que permite eliminar un usuario y sus autos marcados.  
- Es necesario colocar en el *header* el token en la propiedad *token*.

***

### get /api/user/search/:TERM
Esta es una ruta que permite obtener usuarios dependiendo del termino colocado.  
- Es necesario colocar como *parametro* el termino a buscar en *:TERM*.



***
#### LAS SIGUIENTES RUTAS PUEDEN SER LENTAS DEBIDO A LA TECNICA DE WEB SCRAPING

### post /api/trackerCars/:ID_ML
Esta es una ruta que creara un nuevo elemento y lo asignara al usuario del token.  
- Es necesario que en *ID_ML* sea el id de un auto en Mercado Libre.  
- En el *header* se pasa el token en la propiedad *token*.  

***

### put /api/trackerCars/:ID_USER
Esta es una ruta que actualizara el elemento que se coloque en el ID_USER.  
- Es necesario pasar el *token* del usuario por el *header*.  
- Es necesario que en *ID_ML* sea el id de un auto en Mercado Libre.  

***

### put /api/trackerCars/
Esta es una ruta que actualizara todos los elementos del usuario en el token.  
- Es necesario pasar el *token* del usuario por el *header*.  

***

### delete /api/trackerCars/:ID_USER
Esta es una ruta que elimiara el elemento que se coloque en el ID_USER.  
- Es necesario pasar el *token* del usuario por el *header*.  
- Es necesario que en *ID_ML* sea el id de un auto en Mercado Libre.  