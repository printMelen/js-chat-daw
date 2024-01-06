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
const listaCont = document.querySelector("#lista");
const error = document.createElement("p");
let respuesta;
let mensajes;
let container;
let containerMensaje;
let parrafos;
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
            for (let i = mensajes.length-1; i > 0; i--) {
                dibujarMensaje(mensajes[i]);
            }
        }  
    }
    xhr.send();
    setTimeout(f, 2000);
}
function dibujarMensaje(mensaje) {
    const estructura=document.createElement("div");
    estructura.innerHTML = `
        <div>
            <p>${mensaje.nombre}</p>
            <p>${mensaje.mensaje}</p>
            <p>${mensaje.hora+" "+mensaje.fecha}</p>
        </div>
    `;
    listaCont.appendChild(estructura);
    containerMensaje = estructura.querySelector("div");
    parrafos = estructura.querySelectorAll("div>p");
    contenedor(estructura,mensaje.escrito);
    entrada(containerMensaje,mensaje.escrito);
    nombre(parrafos[0]);
    texto(parrafos[1]);
    fecha(parrafos[2]);

}
// closeLogin();