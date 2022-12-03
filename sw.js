const CACHE ='Cache-1';
const CACHE_DINAMICO ='Dinamico-1';
const CACHE_ESTATICO ='Estatico-1';
const CACHE_INMUTABLE ='Inmutable-1';
//Indicamos que es lo que debe de pasar durante el proceso de instalación del Service Worker
self.addEventListener('install', evento=>{
    const promesa = caches.open(CACHE)
        .then(cache=>{
            return cache.addAll([
                // '/',
                'index.html',
                'assets/img/proevent.png',
                'assets/img/index/1.jpg',
                'assets/img/index/2.jpg',
                'assets/img/index/3.jpg',
                'assets/img/index/boda.jpg',
                'servicios.html',
                'assets/img/servicios/1.jpg',
                'assets/img/servicios/2.jpg',
                'assets/img/servicios/3.jpg',
                'assets/img/servicios/boda1.jpg',
                'blog.html',
                'assets/img/blog/1.jpg',
                'assets/img/blog/2.jpg',
                'assets/img/blog/3.jpg',
                'assets/img/blog/4.jpg',
                'assets/img/blog/5.jpg',
                'assets/img/blog/6.jpg',
                'assets/img/blog/7.jpg',
                'assets/img/blog/8.jpg',
                'assets/img/blog/9.jpg',
                'assets/img/blog/10.jpg',
                'assets/img/blog/11.jpg',
                'assets/img/blog/boda2.jpg',
               // '/assets/img/blog/PROEVENT.mp4',
                'nosotros.html',
                'assets/img/nosotros/1.jpg',
                'assets/img/nosotros/2.jpg',
                'assets/img/nosotros/3.jpg',
                'assets/img/nosotros/4.jpg',
                'assets/img/nosotros/boda3.jpg',
                'opiniones.html',
                'assets/img/contacto/boda4.jpg',
                'css/styles.css',
                'assets/img/error_conexion.jpeg',
                'offline.html',
                'js/app.js',
            ]);
        });
    //Separamos los archivos que no se modificarán en un espacio de cache inmutable
    const cacheInmutable = caches.open(CACHE_INMUTABLE)
        .then(cache=>{
            cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
            cache.add('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js');
            cache.add('https://fonts.googleapis.com/css?family=Montserrat:400,700');
            cache.add('https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700');
          

 
        });
        //Indicamos que la instalación espere hasta que las promesas se cumplan
    evento.waitUntil(Promise.all([promesa, cacheInmutable]));
});

self.addEventListener('activate',evento =>{
    const respuesta=caches.keys().then(keys =>{
        keys.forEach(key =>{
            if(key !== CACHE && key.includes('cache')){
                return caches.delete(key);
            }
        })
    })
    evento.waitUntil(respuesta); 
})


self.addEventListener('fetch', evento =>{
    //Estrategia 5 CACHE WITH NETWORK RACE
    const respuesta = new Promise( (resolve, reject) =>{
    let rechazada = false;
    //si ninguna de las dos puede responder en lugar de retornar
    // el error 404 o el dinosaurio del navegador, retornaremos una imagen
    //o el texto de rechazo
    const falloUnaVez = () => {
    if ( rechazada ) {
    if ( /\.(png|jpg)$/i.test( evento.request.url ) ) {
    resolve( caches.match('/assets/img/error_conexion.jpeg') );
    } else {
    reject('No se encontro respuesta');
    }
    } else {
    rechazada = true;
    }
    };
    //respuesta de la web si ok retorna la respuesta si no, se ejecuta el fallo
    fetch( evento.request ).then( res => {
    res.ok ? resolve(res) : falloUnaVez();
    }).catch( falloUnaVez );
    //respuesta de cache, si no existe se ejecuta el fallo
    caches.match( evento.request ).then( res => {
    res ? resolve( res ) : falloUnaVez();
    }).catch( falloUnaVez );
    })
    .catch(err => {
        //si ocurre un error, en nuestro caso no hay conexión
        if(evento.request.headers.get('accept').includes('text/html')){
        //si lo que se pide es un archivo html muestra nuestra página offline que esta en cache
        return caches.match('offline.html');
        }
        });
        evento.respondWith(respuesta);
       });

//recibimos el nombre del espacio de cache a limpiar y el nnumero de archivos permitido
function limpiarCache(nombreCahe, numeroItems){
    //abrimos el cache
    caches.open(nombreCahe)
        .then(cache=>{
            //recuperamos el arreglo de aerchivos existentes en el espacio de cache
            return cache.keys()
                .then(keys=>{
                    //si el numero de archivos supera el limite permitido 
                    if (keys.length>numeroItems){
                        //eliminamos el más antiguo y repetim,os el proceso
                        cache.delete(keys[0])
                            .then(limpiarCache(nombreCahe, numeroItems));
                    }
                });
        });
}