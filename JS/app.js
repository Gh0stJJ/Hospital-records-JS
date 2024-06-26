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
var sonName;

var error;

var formInput;
var countryElement;
var cityElement;
var table;
var auxTable;
var imgElement;
var fillBlank;
var para;
var refTable;
var childrenTable;
var radioBtn;
var hasChildren;
var noChildren;
var childInputContainer;

//Variables de control *flags*
var rbChecker = false;
var setAgeCheck = false;



//Lista de usuarios
var users = [];


//Calculo de edad

/**
 * Calculate the age of a person 👴🏽
 * @param {Date} birthday 
 * @returns age in years, months, days and hours
 */
function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    var years = Math.abs(ageDate.getUTCFullYear() - 1970);
    var months = Math.abs(ageDate.getUTCMonth());
    var days = Math.abs(ageDate.getUTCDate() - 1);
    var hours = Math.abs(ageDate.getUTCHours());
    return {years: years, months: months, days: days, hours: hours};
}

/**
 * Calcula la fecha y hora actual
 * @returns Fecha actual en formato yyyy-mm-dd hh:mm:ss
 */
function getCurrentDate(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}


/**
 * Establece la edad en el DOM
 * @param {JSON} age
 * 
 */
function setAge(age){
    
    if(setAgeCheck){
        return;
    }else{
        var ageElement = document.getElementById('age');
        var ageString = age.years + ' años, ' + age.months + ' meses, ' + age.days + ' dias y ' + age.hours + ' horas';
        var paragraph = document.createElement('p');
        paragraph.innerHTML = ageString;
        ageElement.appendChild(paragraph);
        setAgeCheck = true;
    }

}


/**
 * Agrega una imagen al div imagen retrato
 * @param {*} e 
 */
function addImage(e){
    e.preventDefault();
    console.log('click');

    
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.addEventListener('change', function(){
        var file = input.files[0];

        if (file) {

            var reader = new FileReader();
            reader.onload = function(e){
                
                imgElement.src = e.target.result;

                //Set zindex to 1

                imgElement.style.zIndex = 1;
                fillBlank.style.zIndex = 0;
                para.style.zIndex = 0;

            };
            reader.readAsDataURL(file);

            console.log(imagen.src);
        }
        
    });

}


//Creacion de objetos
/**
 * Crea la tabla principal
 */
function createTable(){
    table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'table-hover','table-borderless','table-responsive', 'table-primary', 'align-middle');
    var thead = document.createElement('thead');
    thead.classList.add('table-secondary');
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


/**
 * Crea la tabla de hijos
 */
function createSonsTable(){
    auxTable = document.createElement('table');
    auxTable.classList.add('table', 'table-striped', 'table-hover','table-borderless','table-responsive', 'table-primary', 'align-middle');
    var thead = document.createElement('thead');
    thead.classList.add('table-secondary');
    var caption = document.createElement('caption');
    caption.classList.add('table-caption');
    caption.innerHTML = 'Hijo(s)';
    auxTable.appendChild(caption);
    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.innerHTML = 'Nombre';
    tr.appendChild(th);
    thead.appendChild(tr);
    auxTable.appendChild(thead);
    var tbody = document.createElement('tbody');
    tbody.classList.add('table-group-divider');
    tbody.id = 'tableBodyChild';
    auxTable.appendChild(tbody);


}

/**
 * Agrega una fila a la tabla principal
 * @param {JSON} user 
 * @returns tbody
 */
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

/**
 * Agrega una fila a la tabla de hijos
 * @param {JSON} son 
 * @returns  tbody
 */
function addSonsRow(son){
    var tbody = document.getElementById('tableBodyChild');
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.scope = 'row';
    td.innerHTML = son.name;
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


/**
 * Oculta el radio button de hijos y muestra el input para el nombre del hijo en caso de que se seleccione que tiene hijos
 */
function toggleChildInput() {
    rbChecker = true;
    if (hasChildren.checked) {
        console.log('Has children');
        //Borramos al abuelo
        var inicio = document.getElementById('hijos');
        hasChildren.parentElement.parentElement.remove();
        //Agregamos un campo para el nombre del hijo
        var div = document.createElement('div');
        div.classList.add('form-group');
        var label = document.createElement('label');
        label.innerHTML = 'Nombre del hijo';
        var input = document.createElement('input');
        input.type = 'text';
        input.id = 'sonName';
        input.classList.add('form-control');
        div.appendChild(label);
        div.appendChild(input);
        inicio.appendChild(div);

        sonName = document.getElementById('sonName');
    } else {
        console.log('Has not children');
    }
}




// Funciones de eventos

/**
 * Comprueba el formulario a nivel de JS antes de enviarlo
 * @param {Event} e 
 * @returns boolean
 */
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
    }else if(!rbChecker){
        console.log("Debe seleccionar si tiene hijos o no");
        e.preventDefault(); //Evita que se envie el formulario
        error.classList.add('alert', 'alert-danger');
        error.innerHTML = "Debe seleccionar si tiene hijos o no 😠";
        return false;
    }else if(hasChildren.checked && sonName.value.length == 0){
        console.log("Debe ingresar el nombre del hijo");
        e.preventDefault(); //Evita que se envie el formulario
        error.classList.add('alert', 'alert-danger');
        error.innerHTML = "Debe ingresar el nombre del hijo";
        return false;
    }

    //remueve la clase de error si existe
    if(error.classList.contains('alert-danger')){
        error.classList.remove('alert-danger');
        error.classList.remove('alert');
        error.innerHTML = '';
    }

    //Creamos la tabla principal si no existe
    if(!table){
        createTable();
        refTable.appendChild(table);
    }

    //Creamos la tabla de hijos si se selecciono que tiene hijos
    if(hasChildren.checked){
        if(!auxTable){
            createSonsTable();
            childrenTable.appendChild(auxTable);
        }
        var son = {
            name: sonName.value
        };
        //Agrega el hijo a la tabla
        addSonsRow(son);
    }

    setAge(calculateAge(new Date(birthdate.value)));

    //Agrega el usuario a la lista
    let user = {
        name: user_name.value,
        id: id_user.value,
        age: calculateAge(new Date(birthdate.value)).years,
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


/**
 * Esta funcion se ejecuta cuando el DOM esta listo
 */
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
    childrenTable = document.getElementById('childrenTable');
    imagen = document.getElementById('photo');
    imgElement = document.getElementById('img');
    fillBlank = document.getElementById('fillBlank');
    para = document.getElementById('para');
    
    //Radio button elemennts
    radioBtn = document.getElementById('radioBtn');
    hasChildren = document.getElementById('children1');
    noChildren = document.getElementById('children2');
    childInputContainer = document.getElementById('childInputContainer');

    //Si da click en el radio button se activa el evento
    hasChildren.addEventListener('click', toggleChildInput);
    noChildren.addEventListener('click', toggleChildInput);

    //Set click listener al div 
    imagen.addEventListener('click', addImage);

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


}

//Listener que se activa cuando el DOM esta listo
document.addEventListener('DOMContentLoaded', domReady);

