

var url=window.location.href;
var ubicaciónSw='/ProEvent/sw.js';

if (navigator.serviceWorker){
    //Registramos el sw indicando la ubicación del archivo
    if(url.includes('localhost')){
        ubicaciónSw='/sw.js';
    }
    navigator.serviceWorker.register(ubicaciónSw);
   }

   /*if (navigator.serviceWorker){
    //Registramos el sw indicando la ubicación del archivo
   navigator.serviceWorker.register("/sw.js");
   }*/