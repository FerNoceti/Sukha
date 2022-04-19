import { guardarCarritoLS,  agregarCarritoHTML, contadorCarritoHTML, addItemCarrito, calcularPrecio } from "./Carrito.js";

class Producto{

    //Constructor

    constructor(id, nombre, precio, imagen){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.talle = "Sin Definir";
    }

    //Métodos

    setTalle(talle){
        this.talle = talle;
    }

    precioConDescuento(descuento){
        return this.precio - this.precio * descuento / 100;
    }
}

export{Producto};

function obtenerTalle(n){
    let talle = document.getElementById(`talleProducto${n}`).value;
    if (talle == "Elegí tu talle"){
        talle = false;
    }else{
        return talle;
    }
}

export function cargarProductosHTML(items){
    const containerProductos = document.getElementById("productosContainer");

    let idCompra = 0;
    for (const producto of items){
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

export function limpiarProductosHTML(){
    const containerProductos = document.getElementById("productosContainer");
    containerProductos.innerHTML = ""
}

export function cambiarPrecioHTML(carrito){
    document.getElementById("precio__valor").textContent = `${calcularPrecio(carrito)}`;
}

//Events

export function agregarEventosProductosHTML(items, carrito){
for (let i = 0; i < items.length; i++){
    document.getElementById(`comprar${i}`).addEventListener("click", ()=> {
    if (obtenerTalle(i)){
        addItemCarrito(carrito, items[i], obtenerTalle(i));
        contadorCarritoHTML()
        cambiarPrecioHTML(carrito);
        agregarCarritoHTML(items[i], obtenerTalle(i));
        guardarCarritoLS(carrito);
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

export function mensaje(texto){
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