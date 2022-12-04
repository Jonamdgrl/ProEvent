import agenciabd, {guardar,consultar,crearEtiqueta} from './funciones.js';

//Inndicamos el nombre de la base de datos "Tineda", la tabla "productos"
//y sus atributos ++id(autoincremental), nombre, servicio y descripción.
let bd=agenciabd("agencia", {productos:`++id,nombre, servicio,descripcion`});


//recuperando inputs del formulario
const clave_prod = document.getElementById("clave");
const nombre_prod = document.getElementById("nombre");
const servicio_prod = document.getElementById("servicio");
const desc_prod = document.getElementById("descripcion");
const mesajeSinRegistros = document.getElementById("siRegistros");

const divMensajes = document.getElementById("Mensajes");
const contenedorError = document.getElementById("contenedorError");
const contenedorOk = document.getElementById("contenedorOk");
const mensajeError = document.getElementById("mensajeError");
const mensajeOk = document.getElementById("mensajeOk");

//accediendo a los botones
const btGuardar=document.getElementById("guardar");
//const btModificar=document.getElementById("modificar");
//const btEliminarTodo=document.getElementById("eliminar-todo");


//visualizando datos registrados 
window.onload=() =>{

cargarTabla();
}



//Evento click para guardar
btGuardar.onclick=(evento)=>{
    //Se enviar los datos del formulario a la función guardar del archivo funciones.js
     let flag =guardar(bd.productos, {
     nombre:nombre_prod.value,
     servicio:servicio_prod.value,
     descripcion:desc_prod.value
 });
 
 if(flag){
    //Se limpian las cajas de texto
   nombre_prod.value="";
   servicio_prod.value=""
   desc_prod.value="";

   cargarTabla();
   
}
}


/*Evento click para guardar cambios
btModificar.onclick=(evento)=>{
    //Se recupera el id del producto a modificar
    const id=parseInt(clave_prod.value||0);
    if(id){
       //si exiete el id se enviar los datos del formulario a la función guardar del archivo funciones.js
        bd.productos.update(id,{
            nombre:nombre_prod.value,
            servicio:servicio_prod.value,
            descripcion:desc_prod.value
        }).then((resultado)=>{
            if(resultado){
               console.log("Modificación realizada");
                nombre_prod.value="";
                servicio_prod.value=""
                desc_prod.value="";
                cargarTabla();
                
            }else{
                console.log("No se aplicaron los cambios");
        
            }
            
        })

        
    }
   
    
}*/


/*Evento click para  eliminar todo
btEliminarTodo.onclick=()=>{
    
      //se ejecuta el borrado de toda la base de datos y se crea nuevamente pero vacia
    
       bd.delete();
       bd=agenciabd("agencia", {productos:`++id,nombre, servicio,descripcion`});
       bd.open();
       location.reload();
      
}*/

//Encagado de consultar los productos y enviarlos al html
function cargarTabla(){
    const tbody =document.getElementById("tbody");
    while(tbody.hasChildNodes()){
        tbody.removeChild(tbody.firstChild);
    }
    consultar(bd.productos,(productos)=>{
       
        if (productos){
            mesajeSinRegistros.textContent="";

            crearEtiqueta("tr",tbody, (tr)=>{
              for(const atributo in productos){
               
                crearEtiqueta("td",tr, (td)=>{
                  td.textContent =productos.servicio===productos[atributo]?`$ ${productos[atributo]}`:productos[atributo];
                })
            }
            
        })
        
    }
    })

}


/*function btnEditar(evento) {
    let id=parseInt(evento.target.dataset.id);
   
    bd.productos.get(id, producto=>{
      clave_prod.value=producto.id||0;
      nombre_prod.value=producto.nombre||"";
      servicio_prod.value=producto.servicio||"";
      desc_prod.value=producto.descripcion||"";

    })
}

/*function btnEliminar(evento) {
    let id=parseInt(evento.target.dataset.id);
   console.log(id);
   bd.productos.delete(id);
   cargarTabla();

    
}*/



