//importamos clases
import { Producto } from "./Producto.js";

//Carrito y Local Storage

const guardarLocal = (clave, valor) =>{ localStorage.setItem(clave, valor) }

function constructorCarrito() {
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

function guardarCarritoLS(){
    guardarLocal('carrito', JSON.stringify(carrito));
}

function obtenerTalle(n){
    let talle = document.getElementById(`talleProducto${n}`).value;
    if (talle == "Elegí tu talle"){
        talle = false;
    }else{
        return talle;
    }
}

function addItemCarrito(producto, talleP){
    carrito.push({nombre: producto.nombre, descripcion: producto.descripcion, tipo: producto.tipo, precio: producto.precio, talle: talleP, cantidad: 1})
}

/*

function actualizarCarrito(producto, talle){
    for (const item of carrito){
        if(item.id == producto.id && item.talle == talle){
            item.cantidad++;
            break;
        }
    }
}

function isInCart(producto){
    for (const item of carrito){
        if (item.id == producto.id && item.talle == producto.talle){
            return true;
        }
    }
    return false;
}

*/

function calcularPrecio(){
    const total = carrito.reduce((precioTotal, producto) => precioTotal + producto.precio, 0);
    return total;
}

let carrito = constructorCarrito();

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

//DOM

function agregarCarritoHTML(producto, talle){
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

function contadorCarritoHTML(){
    let contador = document.getElementById("contadorCarrito");
    contador.textContent = parseInt(contador.textContent) + 1;
}

function limpiarCarritoHTML(){
    const containerCarrito = document.getElementById("containerCarrito")
    while (containerCarrito.firstChild) {
        containerCarrito.removeChild(containerCarrito.firstChild);
    }
}

function cargarProductosHTML(){
    const containerProductos = document.getElementById("productosContainer");

    let idCompra = 0;
    for (const producto of itemsConverted){
        let productoHTML = document.createElement("div");
        productoHTML.className = "producto";
        productoHTML.innerHTML = `
        <div class="producto__imgContainer">
            <img class="producto__img" src="${producto.imagen}" alt="${producto.nombre}">
        </div>
        <div class="producto__body">
            <span class="producto__titulo">${producto.nombre}</span>
            <p class="producto__descripcion">
            Precio: $${producto.precio}
            <br/>
            <select id="talleProducto${idCompra}" class="producto__talles" name="talles" required>
                <option selected hidden>Elegí tu talle</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>
            </p>

            <button id="comprar${idCompra}" class="producto__boton">Agregar al carrito</button>
        </div>
        `;
        containerProductos.appendChild(productoHTML);
        idCompra++;
    }
}

function limpiarProductosHTML(){
    const containerProductos = document.getElementById("productosContainer");
    containerProductos.innerHTML = ""
}

function cambiarPrecioHTML(){
    let precio = calcularPrecio();
    document.getElementById("precio__valor").textContent = `${precio}`;
}

//Events

function agregarEventosProductosHTML(){
for (let i = 0; i < itemsConverted.length; i++){
    document.getElementById(`comprar${i}`).addEventListener("click", ()=> {
    if (obtenerTalle(i)){
        addItemCarrito(itemsConverted[i], obtenerTalle(i));
        contadorCarritoHTML()
        cambiarPrecioHTML();
        agregarCarritoHTML(itemsConverted[i], obtenerTalle(i));
        guardarCarritoLS();
        mensaje("Producto agregado")
    }
    else{
        Swal.fire({
            title: 'Error!',
            text: 'Debes elegir un talle!',
            icon: 'error',
            confirmButtonText: 'Entendido'
})
    }
    });
}
}

//fetch

function cargarItems(tipo){
    //pido los datos a la API de mercado libre
    fetch('https://api.mercadolibre.com/sites/MLA/search?q=' + tipo)
    .then(res => {
        return res.json()
    }).then((res) =>{
        //verifico la obtención de los datos
        items = res.results
        console.log(items)
    }).then(() => {
        //paso mis items al objeto producto
        convertirItems()
        console.log(itemsConverted)
    }).then(() => {
        //cargo mis items en el html agregando sus eventos
        cargarProductosHTML();
        agregarEventosProductosHTML();
        const searchTitle = document.getElementById("productosTitulo")
        if (items.length == 0){
            searchTitle.textContent = "No hay resultados"
        }
        window.scroll(0, 0);
    })
}

function convertirItems(){
    items.forEach((item)=>{
        let producto = new Producto (item.id, item.title, item.price, item.thumbnail)
        itemsConverted.push(producto)
    })
}

//limpiar carrito

const botonLimpiarCarrito = document.getElementById("limpiarProductos");
botonLimpiarCarrito.addEventListener("click", ()=>{
    limpiarCarritoHTML();
    carrito = [];
    cambiarPrecioHTML();
    document.getElementById("contadorCarrito").textContent = 0;
    guardarCarritoLS();
    mensaje("Se eliminaron los productos de su carro")
})

//Obtenemos los items de la API de mercado librec para luego convertirlos
let items = []
let itemsConverted = []

cargarItems("moda")

//Comprar

const botonComprar = document.getElementById("comprar");
botonComprar.addEventListener("click", () =>{
    if(carrito.length == 0){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No agregaste nada al carrito!',
})
    }
    else{
        Swal.fire(
            'Compra Exitosa!',
            'Gracias por confiar en nosotros!',
            'success'
        );
        limpiarCarritoHTML();
        carrito = [];
        cambiarPrecioHTML();
        document.getElementById("contadorCarrito").textContent = 0;
        guardarCarritoLS();
        window.scroll(0, 0);
        filtrarItems("moda")
    }
})

function mensaje(texto){
    Toastify({
        text: texto,
        className: "info",
        duration: 2000,
        stopOnFocus: true,
        style: {
            background: "#B388EB",
            color: "black",
            marginRight: "150px",
            marginTop: "70px",
            padding: "10px 20px",
            borderRadius: "20px"
        }
        }).showToast();
}


//Filtrar por tipos

function filtrarItems(type){
    itemsConverted = []
    limpiarProductosHTML()
    cargarItems(type)
    const searchTitle = document.getElementById("productosTitulo")
    searchTitle.textContent = type.toUpperCase()
    window.scroll(0,0)
}

const inicio = document.getElementById("inicio");
inicio.addEventListener("click", () =>{filtrarItems("moda")})
const remeras = document.getElementById("remeras")
remeras.addEventListener("click", () => filtrarItems("remeras"))
const buzos = document.getElementById("buzos")
buzos.addEventListener("click", () => filtrarItems("buzos"))
const shorts = document.getElementById("shorts")
shorts.addEventListener("click", () => filtrarItems("shorts"))
const pantalones = document.getElementById("pantalones")
pantalones.addEventListener("click", () => filtrarItems("pantalones"))
const zapatillas = document.getElementById("zapatillas")
zapatillas.addEventListener("click", () => filtrarItems("zapatillas"))

//search

const search = document.getElementById("search")
const lupa = document.getElementById("lupa")

lupa.addEventListener("click", () => buscarPorTexto())

function buscarPorTexto(){
    if(search.value.length < 3){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debes ingresar al menos 3 letras para buscar!',
        })
    }
    else{
        filtrarItems(search.value)
    }
}