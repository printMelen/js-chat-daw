function openLogin(elementoPadre, accion){

    const sectionLogin=document.createElement("section");
    
    sectionLogin.innerHTML=`        
        <form>
        <fieldset>
            <div class="mb-10 border-solid border-gray-600">
                <div class="flex items-center justify-center font-mono text-white text-sm font-bold leading-6 gap-2">
                  <input type="text" name="user" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="usuario" required>
                  <input type="password" name="pass" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password" required>
                  <button id="submit" type="button" class="p-2 rounded-lg  bg-green-500 shadow-lg">Enviar</button>
                </div>
            </div>
        </fieldset>
        </form>`;
    
    const s=elementoPadre.appendChild(sectionLogin); 
    const submit=s.querySelector("#submit");
    submit.addEventListener("click",accion);
    return s;
}

function closeLogin(elemento)
{
    elemento.remove();    
}

export{
    closeLogin,
    openLogin
}