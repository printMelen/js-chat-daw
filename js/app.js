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
const listaCont = document.querySelector("#lista");
const error = document.createElement("p");
const errorLargo = document.createElement("p");
const formulario = document.querySelector("main>div>form");
const inputTexto = document.querySelector("#texto");
const boton = document.querySelector("#enviar");
let respuesta;
let mensajes;
let containerMensaje;
let parrafos;
div.style.display = "none";

openLogin(main, callback);
let xhr = new XMLHttpRequest();
const section = document.querySelector("section");
const formularioLogin = document.querySelector("section>form");
const inputNombre = document.querySelector('[name="user"]');
const inputContrasenia = document.querySelector('[name="pass"]');

boton.addEventListener("click", enviarMensaje);
inputTexto.addEventListener('input', function () {
    // Obtener el contenido del campo de texto
    let texto = this.value;

    // Verificar si supera los 256 caracteres
    if (texto.length > 256) {
        // Truncar el texto a 256 caracteres
        this.value = texto.slice(0, 256);
        errorLargo.textContent = "Texto muy largo";
        setTimeout(function () {
            errorLargo.textContent = "";
        }, 3000);
    }
});
formularioLogin.addEventListener("submit", callback);
formularioLogin.appendChild(error);
formulario.appendChild(errorLargo);

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
                try {
                    respuesta = JSON.parse(xhr.responseText);
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
    xhr.open("GET", "https://handmadegames.es/chat/API/v1/chat/list?apiKey=" + respuesta[0].apiKey, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            try {
                mensajes = JSON.parse(xhr.responseText);
            } catch (error) {
                console.error("Error al parsear la respuesta JSON:", error);
            }
            //borro los mensajes antes de imprimir
            while (listaCont.firstChild) {
                listaCont.removeChild(listaCont.firstChild);
            }
            //imprimo los mensajes
            for (let i = mensajes.length - 1; i > 0; i--) {
                dibujarMensaje(mensajes[i]);
            }
        }
    }
    xhr.send();
    //Hago recursiva la funcion
    setTimeout(f, 2000);
}
function dibujarMensaje(mensaje) {
    const estructura = document.createElement("div");
    estructura.innerHTML = `
        <div>
            <p>${mensaje.nombre}</p>
            <p>${mensaje.mensaje}</p>
            <p>${mensaje.hora + " " + mensaje.fecha}</p>
        </div>
    `;
    listaCont.appendChild(estructura);
    containerMensaje = estructura.querySelector("div");
    parrafos = estructura.querySelectorAll("div>p");
    contenedor(estructura, mensaje.escrito);
    entrada(containerMensaje, mensaje.escrito);
    nombre(parrafos[0]);
    texto(parrafos[1]);
    fecha(parrafos[2]);

}
function enviarMensaje() {
    if (inputTexto.value != "") {
        let fecha = new Date(Date.now());
        let hora = fecha.getHours();
        let minutos = fecha.getMinutes();
        let dia = fecha.getDate();
        let mes = fecha.getMonth() + 1;
        let ano = fecha.getFullYear();

        if (dia < 10) {
            dia = "0" + dia;
        }
        if (mes < 10) {
            mes = "0" + mes;
        }
        if (hora < 10) {
            hora = "0" + hora;
        }
        if (minutos < 10) {
            minutos = "0" + minutos;
        }

        const mensajeSend = {
            mensaje: inputTexto.value,
            hora: hora + ":" + minutos,
            fecha: dia + "/" + mes + "/" + ano,
            apiKey: respuesta[0].apiKey
        }

        const cadenaJSON = JSON.stringify(mensajeSend);


        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 201) {
                    // La solicitud fue exitosa
                    console.log("Solicitud PUT exitosa");
                } else {
                    // Hubo un error en la solicitud
                    console.error("Error en la solicitud PUT:", xhr.status);
                }
            }
        };

        xhr.onerror = () => {
            console.error('Error en la red');
        };

        xhr.open("PUT", "https://handmadegames.es/chat/API/v1/chat/insert", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(cadenaJSON);
    }
    inputTexto.value = "";
}
