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
    carrito.push({nombre: producto.nombre, descripcion: producto.descripcion, tipo: producto.tipo, precio: producto.precio, talle: talleP})
}

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
    for (const producto of productosEnVenta){
        let productoHTML = document.createElement("div");
        productoHTML.className = "producto";
        productoHTML.innerHTML = `
        <img class="producto__img" src="./media/productos/${producto.nombre}.png" alt="${producto.img}">
            <div class="producto__body">
                <span class="producto__titulo">${producto.nombre}</span>
                <p class="producto__descripcion">
                Precio: $${producto.precio}
                <br/>
                ${producto.descripcion}
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

function cambiarPrecioHTML(){
    let precio = calcularPrecio();
    document.getElementById("precio__valor").textContent = `${precio}`;
}

//Events

function agregarEventosProductosHTML(){
for (let i = 0; i < productosEnVenta.length; i++){
    document.getElementById(`comprar${i}`).addEventListener("click", ()=> {
    if (obtenerTalle(i)){
        addItemCarrito(productosEnVenta[i], obtenerTalle(i));
        contadorCarritoHTML()
        cambiarPrecioHTML();
        agregarCarritoHTML(productosEnVenta[i], obtenerTalle(i));
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

//Creamos productos y los agregamos a una lista
let remeraRoja = new Producto(`Remera Roja`, `Remera Roja de algodón`, 1, 1000);
let remeraNegra = new Producto(`Remera Negra`, `Remera Negra de tela deportiva`, 1, 950);
let buzoLiso = new Producto(`Buzo Simple`, `Buzo sin estampado 100% algodón`, 2, 650, 30);
let shortAdidas = new Producto(`Short Adidas`, `Short de la selección Argentina`, 3, 599);
let pantalonDeportivo = new Producto(`Pantalon Nike`, `Pantalon Nike de tela deportiva`, 4, 750);
let zapatillas = new Producto(`Zapatillas Jordan`, `Zapatillas edición coleccionista Jordan`, 5, 7590);

let productosEnVenta = [remeraRoja, remeraNegra, buzoLiso, shortAdidas, pantalonDeportivo, zapatillas];

//Cargamos los productos en el html

cargarProductosHTML();

//Agregamos los eventos en productos

agregarEventosProductosHTML();

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


//Filtrar por tipos y buscador a terminar