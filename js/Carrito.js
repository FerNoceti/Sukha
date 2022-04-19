import { Producto } from "./Producto.js";

//Carrito y Local Storage

const guardarLocal = (clave, valor) =>{ localStorage.setItem(clave, valor) }

function cargarCarritoLS(producto){
    const containerCarrito = document.getElementById("containerCarrito");
    let productoHTML = document.createElement("div");
    productoHTML.className = "carrito__producto";
    productoHTML.innerHTML = `
    <span class="carrito__titulo">${producto.nombre}</span>
    <span class="carrito__precio">$${producto.precio}</span>
    <span class="carrito__talle">Talle: ${producto.talle}</span>
    `;
    containerCarrito.appendChild(productoHTML);
}

export function contadorCarritoHTML(){
    let contador = document.getElementById("contadorCarrito");
    contador.textContent = parseInt(contador.textContent) + 1;
}

export function constructorCarrito() {
    let carrito = []

    if(!localStorage.getItem("carrito")){
        guardarLocal("carrito", "[]")
    }else{
        const almacenados = JSON.parse(localStorage.getItem("carrito"));
        let precioLS = 0;
        for (const producto of almacenados){
            carrito.push(new Producto(producto));
            cargarCarritoLS(producto);
            contadorCarritoHTML();
            precioLS += producto.precio;
        }
        document.getElementById("precio__valor").textContent = `${precioLS}`;
    }

    return carrito
}

export function guardarCarritoLS(carrito){
    guardarLocal('carrito', JSON.stringify(carrito));
}

export function addItemCarrito(carrito, producto, talleP){
    carrito.push({nombre: producto.nombre, descripcion: producto.descripcion, tipo: producto.tipo, precio: producto.precio, talle: talleP, cantidad: 1})
}

export function mostrarCarrito(){
    //Mostrar u ocultar carrito

    const botonCarrito = document.getElementById("mostrarCarrito");
    botonCarrito.addEventListener("click", () => {
    const cart = document.getElementById("cart");
    if (cart.classList == "carrito--hide"){
        cart.classList.remove("carrito--hide");
        cart.classList.add("carrito");
        return
    }
    else{
        cart.classList.remove("carrito");
        cart.classList.add("carrito--hide");
    }
    });
}

export function agregarCarritoHTML(producto, talle){
    const containerCarrito = document.getElementById("containerCarrito");
    let productoHTML = document.createElement("div");
    productoHTML.className = "carrito__producto";
    productoHTML.innerHTML = `
    <span class="carrito__titulo">${producto.nombre}</span>
    <span class="carrito__precio">$${producto.precio}</span>
    <span class="carrito__talle">Talle: ${talle}</span>
    `;
    containerCarrito.appendChild(productoHTML);
}

export function limpiarCarritoHTML(){
    const containerCarrito = document.getElementById("containerCarrito")
    while (containerCarrito.firstChild) {
        containerCarrito.removeChild(containerCarrito.firstChild);
    }
}

export function calcularPrecio(carrito){
    const total = carrito.reduce((precioTotal, producto) => precioTotal + producto.precio, 0);
    return total;
}