//Parte de la request oe la solicitud
//URL de donde sacamos los datos 
//parametros -> datos adicionales al final, por ejemplo un numero de usuario
//Cuerpo-> información/archivos enviada mediante el metodo post 
//metodo-> definir que tipo de accion se va a realizar frente al servidor GET, POST, PUT, DELETE
/**
 * GET= Solicitar informacion 
 * post= enviar informacion 
 * put = actualizar 
 * delete = borrar 
 * Despues recibimos una response(respuesta)
 * que se compone de dos cosas: 
 * 1.codigo de status ->numero del resultado de la solicitud
 * 2. la informacion en por lo general json -> javascript object notation 
 * que es ajax = Asynchronous javascript and XML 
 * envio y recepcion de datos sin recargar la pagina 
 * Funcion fecth se encarga de hacer el llamado y hacer la respuesta
*/

async function getGatitos (cantidad){
  let response = await fetch("https://api.thecatapi.com/v1/images/search?limit=" + cantidad);  //la api siempre trae 1 o 10 
  let gatitos = await response.json();
  return (cantidad < 10) ? gatitos.splice(0, cantidad):gatitos; //con esto controlamos la cantidad de gatitos segun lo solicitado
}

// console.log(getGatitos());

document.getElementById("form").onsubmit = async (e) => {
  e.preventDefault();
  let cantidad = e.target.children[1].value; //Con esto capturamos el valor de gatitos que quiere ver
  

  let gatitos= [];

  if(cantidad) gatitos = await getGatitos(cantidad);
  else gatitos = await getGatitos(1);

  console.log(gatitos);

  let respuesta = document.querySelector("#respuesta");
  respuesta.innerHTML = "";  //para que no se nos sumen mas gatitos, antes de esto se sumaban las nuevas solicitudes
  for(let gatito of gatitos) {
  respuesta.innerHTML += `<div class= "card"><img src="`+ gatito.url + `"></div>`
}
}