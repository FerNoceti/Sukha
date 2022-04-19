//importamos clases
import {mensaje, cambiarPrecioHTML} from "./Producto.js";
import { constructorCarrito, guardarCarritoLS, limpiarCarritoHTML, mostrarCarrito } from "./Carrito.js";
import {cargarItems, filtrarItems} from  './Items.js'

function main(){

    //variables que interactuan con las funciones

    let items = [];

    let carrito = constructorCarrito();

    //Lógica para mostrar el carrito u ocultarlo

    mostrarCarrito();

    //Obtenemos los items de la API de mercado libre para luego convertirlos

    cargarItems(items, "moda", carrito)

    /*
    -----------------------------------
    Agregammos los eventos al programa
    -----------------------------------
    */

    //evneto para limpiar carrito

    const botonLimpiarCarrito = document.getElementById("limpiarProductos");
    botonLimpiarCarrito.addEventListener("click", ()=>{
        limpiarCarritoHTML();
        carrito = [];
        cambiarPrecioHTML(carrito);
        document.getElementById("contadorCarrito").textContent = 0;
        guardarCarritoLS(carrito);
        mensaje("Se eliminaron los productos de su carro")
    })

    //evento para simular Compra

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
            document.getElementById("precio__valor").textContent = `0`;
            document.getElementById("contadorCarrito").textContent = 0;
            guardarCarritoLS(carrito);
            window.scroll(0, 0);
            filtrarItems(items, "moda", carrito)
            search.value = "";
        }
    })

    //evento para filtrar por tipo

    const inicio = document.getElementById("inicio");
    inicio.addEventListener("click", () =>{filtrarItems(items, "moda", carrito)})
    const remeras = document.getElementById("remeras")
    remeras.addEventListener("click", () => filtrarItems(items, "remeras", carrito))
    const buzos = document.getElementById("buzos")
    buzos.addEventListener("click", () => filtrarItems(items, "buzos", carrito))
    const shorts = document.getElementById("shorts")
    shorts.addEventListener("click", () => filtrarItems(items, "shorts", carrito))
    const pantalones = document.getElementById("pantalones")
    pantalones.addEventListener("click", () => filtrarItems(items, "pantalones", carrito))
    const zapatillas = document.getElementById("zapatillas")
    zapatillas.addEventListener("click", () => filtrarItems(items, "zapatillas", carrito))

    //evneto para buscar por parametros

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
            filtrarItems(items, search.value, carrito)
            search.value = ""
        }
    }

}


//ejecución de función main

main();