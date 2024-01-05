function contenedor(elemento, yo=false){
    if(yo)
        elemento.classList.add("flex", "justify-end"); 
    else
        elemento.classList.add("flex", "justify-start"); 
}

function entrada(elemento, yo=false){
    if(yo)
    elemento.classList.add("w-64", "h-auto", "rounded-lg", "bg-green-600", "text-slate-50", "shadow-lg"); 
    else
        elemento.classList.add("w-64", "h-auto", "rounded-lg", "bg-slate-500", "text-slate-50", "shadow-lg"); 
}

function nombre(elemento){
    elemento.classList.add("p-1", "text-left", "underline"); 
}

function texto(elemento){
    elemento.classList.add("py-1", "break-words","px-1.5", "text-left", "italic"); 
}

function fecha(elemento){
    elemento.classList.add("py-1", "px-1.5", "text-right", "italic", "text-xs"); 
}


export{
    contenedor,
    entrada,
    nombre,
    texto,
    fecha
}