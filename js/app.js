import { openLogin, closeLogin } from "/js/login.js";

const div = document.querySelector("main>div");
const main = document.querySelector("main");
const boton = document.querySelector("#enviar");
const error = document.createElement("p");

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
                let respuesta;
                try {
                    respuesta = JSON.parse(xhr.responseText);
                    console.log(respuesta);
                } catch (error) {
                    console.error("Error al parsear la respuesta JSON:", error);
                }
                if (respuesta[0].apiKey != "") {
                    closeLogin(section);
                    div.style.display = "inline";
                } else {
                    error.textContent = "Datos incorrectos";
                }
            }
        };
        xhr.send(formData);
    }
}
// closeLogin();