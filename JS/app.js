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
var table;
var refTable;


//Lista de usuarios
var users = [];


//Calculo de edad

/**
 * Calculate the age of a person 👴🏽
 * @param {Date} birthday 
 * @returns age in years
 */
function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function getCurrentDate(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}


//Creacion de objetos

function createTable(){
    table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'table-hover','table-borderless','table-responsive', 'table-primary', 'align-middle');
    var thead = document.createElement('thead');
    thead.classList.add('table-success');
    var caption = document.createElement('caption');
    caption.classList.add('table-caption');
    caption.innerHTML = 'Registros de consultas medicas';
    table.appendChild(caption);
    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.innerHTML = 'Nombre';
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = 'Cedula';
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = 'Edad';
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = 'Direccion';
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = 'Telefono';
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = 'Fecha de nacimiento';
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = 'Pais';
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = 'Ciudad';
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = 'Fecha de consulta';
    tr.appendChild(th);
    thead.appendChild(tr);
    table.appendChild(thead);
    var tbody = document.createElement('tbody');
    tbody.classList.add('table-group-divider');
    tbody.id = 'tableBody';
    table.appendChild(tbody);

}

function addRow(user){
    var tbody = document.getElementById('tableBody');
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.scope = 'row';
    td.innerHTML = user.name;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = user.id;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = user.age;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = user.address;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = user.phone;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = user.birthdate;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = user.country;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = user.city;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = user.dateTime;
    tr.appendChild(td);
    tbody.appendChild(tr);
    return tbody;
}




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
    }else if (city.value == 0){
        console.log("Debe seleccionar una ciudad");
        e.preventDefault(); //Evita que se envie el formulario
        error.classList.add('alert', 'alert-danger');
        error.innerHTML = "Debe seleccionar una ciudad";
        return false;
    }

    //Creamos la tabla si no existe
    if(!table){
        createTable();
        refTable.appendChild(table);
    }
    //Agrega el usuario a la lista
    let user = {
        name: user_name.value,
        id: id_user.value,
        age: calculateAge(new Date(birthdate.value)),
        address: address.value,
        phone: phone.value,
        birthdate: birthdate.value,
        country: countryElement.options[countryElement.selectedIndex].text,
        city: cityElement.options[cityElement.selectedIndex].text,
        dateTime: getCurrentDate()
    };


    users.push(user);

    //Agrega el usuario a la tabla
    addRow(user);

    console.log(users);
    e.preventDefault(); //Evita que se envie el formulario
    
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
    birthdate = document.getElementById('birthday');
    country = document.getElementById('country');
    city = document.getElementById('city');
    error = document.getElementById('error');
    refTable = document.getElementById('refTable');
    

    //Carga de ciudades
    countryElement = document.getElementById('country');
    
    cityElement = document.getElementById('city');
    countryElement.addEventListener('change', function(){
        //Obtiene el option seleccionado
        let country = countryElement.options[countryElement.selectedIndex].text;
        let cities = putCities(country);
        let cityElement = document.getElementById('city');
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

