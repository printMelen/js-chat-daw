import { openLogin, closeLogin } from "/js/login.js";
import {
    contenedor,
    entrada,
    nombre,
    texto,
    fecha
} from "/js/estilos.js";

const div = document.querySelector("main>div");
const main = document.querySelector("main");
const boton = document.querySelector("#enviar");
const error = document.createElement("p");
let respuesta;
let mensajes;
div.style.display = "none";

openLogin(main, callback);
var xhr = new XMLHttpRequest();
const section = document.querySelector("section");
const formularioLogin = document.querySelector("section>form");
const inputNombre = document.querySelector('[name="user"]');
const inputContrasenia = document.querySelector('[name="pass"]');

formularioLogin.addEventListener("submit", callback);
formularioLogin.appendChild(error);
function callback() {
    if (inputNombre.value.trim() != "" && inputContrasenia.value.trim() != "") {
        const formData = new FormData();
        formData.append("user", inputNombre.value.trim());
        formData.append("pass", inputContrasenia.value.trim());
        xhr.open("POST", "https://handmadegames.es/chat/API/v1/chat/login", true);
        // Configurar el manejo de eventos para la respuesta
        xhr.onreadystatechange = function () {
            // Verificar si la solicitud se completó con éxito (estado 4) y si el código de estado es 200 (OK)
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Manejar la respuesta del servidor
                console.log(xhr.responseText);
                try {
                    respuesta = JSON.parse(xhr.responseText);
                    console.log(respuesta);
                    console.log(respuesta[0].apiKey);
                } catch (error) {
                    console.error("Error al parsear la respuesta JSON:", error);
                }
                if (respuesta[0].apiKey != "") {
                    closeLogin(section);
                    div.style.display = "inline";
                    f();

                } else {
                    error.textContent = "Datos incorrectos";
                }
            }
        };
        xhr.send(formData);
    }
}

function f() {
    xhr.open("GET", "https://handmadegames.es/chat/API/v1/chat/list?apiKey="+respuesta[0].apiKey, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            try {
                mensajes = JSON.parse(xhr.responseText);
            } catch (error) {
                console.error("Error al parsear la respuesta JSON:", error);
            }
            console.log(mensajes);
        }  
    }
    xhr.send();
}
// closeLogin();