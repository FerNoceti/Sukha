import { Producto, cargarProductosHTML, agregarEventosProductosHTML, limpiarProductosHTML} from "./Producto.js";

//fetch

function convertirItems(res, items){
    res.forEach((item)=>{
        let producto = new Producto (item.id, item.title, item.price, item.thumbnail)
        items.push(producto)
    })
}

export function cargarItems(items, tipo, carrito){
    //pido los datos a la API de mercado libre
    fetch('https://api.mercadolibre.com/sites/MLA/search?q=' + tipo)
    .then(res => {
        return res.json()
    }).then((res) =>{
        //verifico la obtención de los datos
        return res.results
    }).then((res) => {
        //paso mis items al objeto producto
        convertirItems(res, items)
    }).finally(() => {
        //cargo mis items en el html agregando sus eventos y en el caso de no tener items, muestro un mensaje
        cargarProductosHTML(items);
        agregarEventosProductosHTML(items, carrito);
        const searchTitle = document.getElementById("productosTitulo")
        items.length == 0 ? searchTitle.textContent = "No hay resultados o no se obtuvo la información" : console.log("Productos obtenidos");
        window.scroll(0, 0);
    })
}

//Filtrar por tipos

export function filtrarItems(items, type, carrito){
    items = []
    limpiarProductosHTML()
    cargarItems(items, type, carrito)
    const searchTitle = document.getElementById("productosTitulo")
    searchTitle.textContent = type.toUpperCase()
    window.scroll(0,0)
}