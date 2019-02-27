"use strict"

var personas = { datos:
  [
    {
      cedula : "123456",
      nombre :  "Juan",
      apellido : "Perez",
      profesion : "Ingeniero"
    },
    {
      cedula : "654321",
      nombre :  "Catalina",
      apellido : "Martinez",
      profesion : "Comerciante"
    },
    {
      cedula : "456789",
      nombre :  "Pedro",
      apellido : "Gonzalez",
      profesion : "Comerciante"
    },
    {
      cedula : "987654",
      nombre :  "Carolina",
      apellido : "Alzate",
      profesion : "Ingeniera"
    }
  ]
};

function fnDefaultData(){

  personas = { datos:
    [
      {
        cedula : "123456",
        nombre :  "Juan",
        apellido : "Perez",
        profesion : "Ingeniero"
      },
      {
        cedula : "654321",
        nombre :  "Catalina",
        apellido : "Martinez",
        profesion : "Comerciante"
      },
      {
        cedula : "456789",
        nombre :  "Pedro",
        apellido : "Gonzalez",
        profesion : "Comerciante"
      },
      {
        cedula : "987654",
        nombre :  "Carolina",
        apellido : "Alzate",
        profesion : "Ingeniera"
      }
    ]
  };

  //Almacenar en el LocalStorage el objeto persona
  //garantizando el formato JSON. 

  localStorage.setItem("usuario", JSON.stringify(personas));

  var str = "";
  var persona= personas.datos;

  for(var i = 0; i< persona.length ; i++){
    str += "cédula" + (i+1) + ": " + persona[i].cedula + ", nombre" + (i+1) + ": "+ persona[i].nombre + 
    ", apellido" + (i+1) + ": "+persona[i].apellido + ", profesión " + (i+1) + ": " + persona[i].profesion +"\n";
  }
   
  alert(str);
}
//Función para mostrar usuario
function fnSelectPerson(){
  try{

    //Capturar el valor en el campo 
    var cedula = $("#cedPerson").val(); //Recuperar valor del campo de texto (Cédula)
    $("#cedPerson").val("");
    var comprobar = false; //BOOL para comprobar si existe la persona
    var usuario = (JSON.parse(localStorage.getItem("usuario"))); //Variable con el JSON del localStorage
    
    console.log(usuario);

    for(var i=0; i<usuario.datos.length;i++ ){
      if(usuario.datos[i].cedula == cedula ){
        var persona = usuario.datos[i];
        
        alert("Cédula: " + persona.cedula +
         "\nNombre: " + persona.nombre +
         "\nApellido: " + persona.apellido + 
         "\nProfesión: " + persona.profesion);    
       comprobar = true

      }
      
      if( i == usuario.datos.length -1 && comprobar == false){

        alert("No existe un registro con la cédula ingresada");

      }
    }

  }catch(err){
    //Ideal implementar Throw
    alert(err);
  }finally{
    //
  }
}

//Función para eliminar usuario segun su cedula
function fnDeletePerson(){
    
  try{

    var cedula = $("#cedPersonDel").val(),
    personas = (JSON.parse(localStorage.getItem("usuario"))), //Variable con el JSON del localStorage
    comprobar = false;
    
    $("#cedPersonDel").val("");

    for(var i=0; i<personas.datos.length;i++){

        if(personas.datos[i].cedula == cedula){

          personas.datos.splice(i, 1);
          comprobar = true;
          alert("El registro con cédula: " + cedula + " a sido eliminado");
          
          localStorage.setItem("usuario", JSON.stringify(personas));
        }

        if(personas.datos.length -1 == i && comprobar == false){

          alert("Error: No existe un registro de una personas con este número de cédula");

        }
    }  

  }catch(Exce){

    alert("Error: " + Exce);

  }finally{
    //
  }
     
}

//Función para insertar valores
function fnInsertPerson(){
  try {

    var usuario = (JSON.parse(localStorage.getItem("usuario"))), //Variable con el JSON del localStorage
    comprobar = false,
    cedula = $("#cedPersonAdd").val(), //Recuperar valor del campo de texto (Cédula)
    nombre = $("#nomPersonAdd").val(), //Recuperar valor del campo de texto (Nombre)
    apellido = $("#apePersonAdd").val(), //Recuperar valor del campo de texto (Apellido)
    profesion = $("#proPersonAdd").val(); //Recuperar valor del campo de texto (Profesión)
    
    $("#cedPersonAdd").val(""); 
    $("#nomPersonAdd").val(""); 
    $("#apePersonAdd").val(""); 
    $("#proPersonAdd").val("");

    console.log(usuario);
    console.log(cedula);

    for(var i=0; i<usuario.datos.length;i++ ){

      if(usuario.datos[i].cedula == cedula ){

       alert("No se puede ingresar personas\nDetalle: Existe un registro con la cédula");
      comprobar = true;
      }

     if(comprobar == false && usuario.datos.length-1 == i){
     usuario.datos.splice(usuario.datos.length,0,{
      cedula: cedula,
      nombre: nombre,
      apellido: apellido,
      profesion: profesion
        
       });
       localStorage.setItem("usuario", JSON.stringify(usuario));
       alert("Se ha creado el nuevo registro de forma exitosa");

       break;
      }
}


}catch(error){

  //Ideal implementar Throw
  alert("Error: " + error);
}finally{
  //
}
}

//Función para actualizar datos
function fnUpdatePerson(){
try{

    var cedula = $("#cedPersonUpd2").val(), //Recuperar valor del campo de texto (Cédula)
    nombre = $("#nomPersonUpd").val(), //Recuperar valor del campo de texto (Nombre)
    apellido = $("#apePersonUpd").val(), //Recuperar valor del campo de texto (Apellido)
    profesion = $("#proPersonUpd").val(), //Recuperar valor del campo de texto (Profesión)
    personas = (JSON.parse(localStorage.getItem("usuario"))), //Variable con el JSON del localStorage
    comprobar = false;
    console.log(cedula);

   $("#nomPersonUpd").val("");
   $("#apePersonUpd").val("");
   $("#proPersonUpd").val(""); 

    for(var i=0; i<personas.datos.length;i++ ){

      if(personas.datos[i].cedula == cedula ){
         comprobar = true;
         personas.datos[i].nombre = nombre;
         personas.datos[i].apellido = apellido;
         personas.datos[i].profesion = profesion;

         localStorage.setItem("usuario", JSON.stringify(personas));
 
         alert("Se han actualizado los datos de la personas con la cédula: " + cedula);

      }

      if(personas.datos.length -1 == i && comprobar == false){

        alert("No se pudierón actualizar los datos \n- No existe el registro de la persona ó");

      }

    }

}catch(error){
   //Ideal implementar Throw
   alert(error);
}finally{
 //
}
}

//Función usada en el documento updateform para comprobar la existencia
//de registros con ese número de cédula
function fnCheckCed(){
  try{
    var usuario = (JSON.parse(localStorage.getItem("usuario"))), //Variable con el JSON del localStorage
    comprobar = false,
    cedula = $("#cedPersonUpd").val(); //Recuperar valor del campo de texto (Cédula)

    console.log(usuario);
    console.log(cedula);

    for(var i=0; i<usuario.datos.length;i++ ){

      if(usuario.datos[i].cedula == cedula ){

      comprobar = true;
      alert("Existe un registro con el número de cédula ingresado");
      }

      if(comprobar == false && usuario.datos.length -1 == i){
        
       alert("Error: No existe un registro con la cédula");

      }

    }

  }catch(error){
     //Ideal implementar Throw
     alert(error);
  }finally{
   //
  }
  }
  
//Validación de entradas

$(function(){
  //Para escribir solo letras
  //$('#').validCampoAPP(' abcdefghijklmnñopqrstuvwxyzáéiou');

  //Para escribir solo numeros   
  $('#cedPersonDel').validCampoAPP('0123456789');
});


/*
localStorage.setItem("personas",JSON.stringify(user));

var personas = JSON.parse(localStorage.getItem("personas"));

localStorage.setItem("lastname", "Smith");

console.log(personas);

proof
*/