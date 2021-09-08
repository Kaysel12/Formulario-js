const inputs = document.querySelectorAll(".formulario__input");
const botonEnvio = document.querySelector(".submit");

const expresiones = {
    // Expresion que puede llevar letras, espacios y asentos
    nombre: /^[a-zA-Zá-Ÿ\s]{1,40}$/,
    // Expresiones regulares que permiten letras,numeros, guion y gion bajo
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/,
    // Expresion desde 4 a 12 digitos
    password: /^.{4,12}$/,
    // Expresion para un correo
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z8-9-]+[a-zA-Z0-9-.]+$/,
    // Expresion para los telefonos, 10 numeros
    telefono: /^\d{10}$/
};

let campos = {
    nombre: false,
    usuario: false,
    password: false,
    password2: false,
    correo: false, 
    telefono: false
};

let funcionParametros = (expresion, contadorInputs, campo) => {
    if (expresion.test(contadorInputs.value)) {
        document.querySelector(`#validacion-${campo}`).classList.remove("error-aviso", "fa-times-circle");
        document.querySelector(`#validacion-${campo}`).classList.add("valido", "fa-check-circle");
        document.querySelector(`#grupo-${campo}`).classList.remove("error", "error-aviso");
        document.querySelector(`.formulario__error-${campo}`).classList.remove("display");
        campos[campo] = true;
    } else {
        document.querySelector(`#validacion-${campo}`).classList.remove("valido", "fa-check-circle");
        document.querySelector(`#validacion-${campo}`).classList.add("error-aviso", "fa-times-circle");
        document.querySelector(`#grupo-${campo}`).classList.add("error", "error-aviso");
        document.querySelector(`.formulario__error-${campo}`).classList.add("display");
        campos[campo] = false;
    };
};

let validarpassword = (campo)=>{
    let password = document.getElementById("password");
    let password2 = document.getElementById("password2");
    if (password.value == password2.value) {
        document.querySelector(`#validacion-${campo}`).classList.remove("error-aviso", "fa-times-circle");
        document.querySelector(`#validacion-${campo}`).classList.add("valido", "fa-check-circle");
        document.querySelector(`#grupo-${campo}`).classList.remove("error", "error-aviso");
        document.querySelector(`.formulario__error-${campo}`).classList.remove("display");
    }else{
        document.querySelector(`#validacion-${campo}`).classList.remove("valido", "fa-check-circle");
        document.querySelector(`#validacion-${campo}`).classList.add("error-aviso", "fa-times-circle");
        document.querySelector(`#grupo-${campo}`).classList.add("error", "error-aviso");
        document.querySelector(`.formulario__error-${campo}`).classList.add("display");
    }
}

let validarInputs = (e) => {
    switch (e.target.name) {
        case "nombre":
            funcionParametros(expresiones.nombre, inputs[0], "nombre");
            break;
        case "usuario":
            funcionParametros(expresiones.usuario, inputs[1], "usuario");
            break;
        case "password":
            funcionParametros(expresiones.password, inputs[2], "password");
            validarpassword("password2")
            break;
        case "password2":
            funcionParametros(expresiones.password, inputs[3], "password2");
            validarpassword("password2")
            break;
        case "correo":
            funcionParametros(expresiones.correo, inputs[4], "correo");
            break;
        case "telefono":
            funcionParametros(expresiones.telefono, inputs[5], "telefono");
            break;
        default:
            break;
    };
};

inputs.forEach(input => {
    input.addEventListener("keyup", validarInputs);
    input.addEventListener("blur", validarInputs);
});

botonEnvio.addEventListener("click", (e) => {
    e.preventDefault();
    let check = document.querySelector("#checkbox");

    if (campos.nombre && campos.usuario && campos.password && campos.telefono && campos.correo && campos.password2 && check.checked) {
        document.querySelector(".formulario__aviso").classList.remove("display2");
        document.querySelector(".enviado").classList.add("display2");
        inputs.forEach(input => {
            input.value = "";
        });
    }else{
        document.querySelector(".enviado").classList.remove("display2");
        document.querySelector(".formulario__aviso").classList.add("display2");
    };
});
