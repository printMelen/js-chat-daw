import {openLogin,closeLogin} from "/js/login.js";

const div = document.querySelector("main>div");
const main = document.querySelector("main");
const boton = document.querySelector("#enviar");
addEventListener("click",callback);
div.style.display="none";


function callback(){
    
}
openLogin(main,callback);
// closeLogin();