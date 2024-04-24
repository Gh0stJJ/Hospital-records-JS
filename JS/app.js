/*
*    JS Para un proyecto de prueba
*   @autor: Juanja
*   @version: 1.0
*/

// Inicializacion de var, objetos, DOM

var user_name;
var id_user;
var address;
var phone;
var birthdate;
var country;
var city;
var error;
var formInput;
var countryElement;
var cityElement;

//Lista de usuarios
var users = [];


//Funciones de validacion

/**
 * Verifica la validez de la cedula ecuatoriana
 * @param {String} cedula 
 */
function valCedula(cedula){
    var cedula = cedula;
    var total = 0;
    var longitud = cedula.length;
    var longcheck = longitud - 1;

    if(cedula !== "" && longitud == 10){
        for(i = 0; i < longcheck; i++){
            if(i%2 === 0){
                var aux = cedula.charAt(i) * 2;
                if(aux > 9) aux -= 9;
                total += aux;
            }else{
                total += parseInt(cedula.charAt(i));
            }
        }

        total = total % 10 ? 10 - total % 10 : 0;

        if(cedula.charAt(longitud-1) == total){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }

}

/**
 * 
 * @param {String} country 
 * @returns 
 */
function putCities(country){
    var cities = [];
    switch(country){
        case 'Ecuador':
            cities = ['Quito', 'Guayaquil', 'Cuenca', 'Manta'];
            break;
        case 'Colombia':
            cities = ['Bogota', 'Medellin', 'Cali', 'Cartagena'];
            break;
        case 'Peru':
            cities = ['Lima', 'Arequipa', 'Cuzco', 'Piura'];
            break;
        case 'Chile':
            cities = ['Santiago', 'Valparaiso', 'Concepcion', 'Arica'];
            break;
        default:
            cities = ['Seleccione un pais',];
            break;
    }

    return cities;
}

// Funciones de eventos

function comprobarForm(e){
    if(id_user.value.length == 0){
        console.log("El campo cedula no puede estar vacio");
        e.preventDefault(); //Evita que se envie el formulario
        error.classList.add('alert', 'alert-danger');
        error.innerHTML = "El campo cedula no puede estar vacio";
        return false;

    }else if(user_name.value.length == 0){
        console.log("El campo nombre no puede estar vacio");
        e.preventDefault(); //Evita que se envie el formulario
        error.classList.add('alert', 'alert-danger');
        
        error.innerHTML = "El campo nombre no puede estar vacio";
        return false;
    }else if(!valCedula(id_user.value)){
        console.log("Cedula incorrecta");
        e.preventDefault(); //Evita que se envie el formulario
        error.classList.add('alert', 'alert-danger');
        error.innerHTML = "Cedula incorrecta";
        return false;
    }else if(address.value.length == 0){
        console.log("El campo direccion no puede estar vacio");
        e.preventDefault(); //Evita que se envie el formulario
        error.classList.add('alert', 'alert-danger');
        error.innerHTML = "El campo direccion no puede estar vacio";
        return false;
    }else if(phone.value.length == 0){
        console.log("El campo telefono no puede estar vacio");
        e.preventDefault(); //Evita que se envie el formulario
        error.classList.add('alert', 'alert-danger');
        error.innerHTML = "El campo telefono no puede estar vacio";
        return false;
    }else if(phone.value.match(/[a-z]/)){
        console.log("El campo telefono no puede tener letras");
        e.preventDefault(); //Evita que se envie el formulario
        error.classList.add('alert', 'alert-danger');
        error.innerHTML = "El campo telefono no puede tener letras";
        return false;
    }else if( phone.value.length < 10){
        console.log("El campo telefono debe tener 10 digitos");
        e.preventDefault(); //Evita que se envie el formulario
        error.classList.add('alert', 'alert-danger');
        error.innerHTML = "El campo telefono debe tener 10 digitos";
        return false;
    }else if (country.value == 0){
        console.log("Debe seleccionar un pais");
        e.preventDefault(); //Evita que se envie el formulario
        error.classList.add('alert', 'alert-danger');
        error.innerHTML = "Debe seleccionar un pais";
        return false;
    }else if (!city.value == 0){
        console.log("Debe seleccionar una ciudad");
        e.preventDefault(); //Evita que se envie el formulario
        error.classList.add('alert', 'alert-danger');
        error.innerHTML = "Debe seleccionar una ciudad";
        return false;
    }


    //Agrega el usuario a la lista
    users.push({
        name: user_name.value,
        id: id_user.value,
        address: address.value,
        phone: phone.value,
        birthdate: birthdate.value,
        country: country.value,
        city: city.value
    });
    
    console.log(users);
    return true;

    //fino
}



function domReady(){
    //Captura todos los elementos necesarios
    formInput = document.getElementById('form');
    user_name = document.getElementById('name');
    id_user = document.getElementById('id');
    address = document.getElementById('address');
    phone = document.getElementById('phone');
    birthdate = document.getElementById('birthdate');
    country = document.getElementById('country');
    city = document.getElementById('city');
    error = document.getElementById('error');
    

    //Carga de ciudades
    countryElement = document.getElementById('country');
    
    cityElement = document.getElementById('city');
    countryElement.addEventListener('change', function(){
        //Obtiene el option seleccionado
        var country = countryElement.options[countryElement.selectedIndex].text;
        var cities = putCities(country);
        var cityElement = document.getElementById('city');
        cityElement.innerHTML = '';
        for(var i = 0; i < cities.length; i++){
            var option = document.createElement('option');
            option.value = i+1;
            option.text = cities[i];
            cityElement.add(option);
        }
    });

    //Inicio de la carga de eventos 
    formInput.addEventListener('submit', comprobarForm);


    //agregar lisneners para imagen

}

//Listener que se activa cuando el DOM esta listo
document.addEventListener('DOMContentLoaded', domReady);

