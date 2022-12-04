import agenciabd, {guardar,consultar,crearEtiqueta} from './funciones.js';

//Inndicamos el nombre de la base de datos "Tineda", la tabla "clientes"
//y sus atributos ++id(autoincremental), nombre, servicio y descripción.
let bd=agenciabd("agencia", {clientes:`++id,nombre, servicio,descripcion`});


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
     let flag =guardar(bd.clientes, {
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
    //Se recupera el id del cliente a modificar
    const id=parseInt(clave_prod.value||0);
    if(id){
       //si exiete el id se enviar los datos del formulario a la función guardar del archivo funciones.js
        bd.clientes.update(id,{
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
       bd=agenciabd("agencia", {clientes:`++id,nombre, servicio,descripcion`});
       bd.open();
       location.reload();
      
}*/

//Encagado de consultar los clientes y enviarlos al html
function cargarTabla(){
    const tbody =document.getElementById("tbody");
    while(tbody.hasChildNodes()){
        tbody.removeChild(tbody.firstChild);
    }
    consultar(bd.clientes,(clientes)=>{
       
        if (clientes){
            mesajeSinRegistros.textContent="";

            crearEtiqueta("tr",tbody, (tr)=>{
              for(const atributo in clientes){
               
                crearEtiqueta("td",tr, (td)=>{
                  td.textContent =clientes.servicio===clientes[atributo]?`$ ${clientes[atributo]}`:clientes[atributo];
                })
            }
            
        })
        
    }
    })

}


/*function btnEditar(evento) {
    let id=parseInt(evento.target.dataset.id);
   
    bd.clientes.get(id, cliente=>{
      clave_prod.value=cliente.id||0;
      nombre_prod.value=cliente.nombre||"";
      servicio_prod.value=cliente.servicio||"";
      desc_prod.value=cliente.descripcion||"";

    })
}

/*function btnEliminar(evento) {
    let id=parseInt(evento.target.dataset.id);
   console.log(id);
   bd.clientes.delete(id);
   cargarTabla();

    
}*/



