//Primera entrega del proyecto final
/*
Aclaraciones: la barra de busqueda todavia sigue en desarrollo, así como las funcionalidades
*/

//Definimos clases

//Producto

class Producto{
    
    //Constructor
    
    constructor(nombre, descripcion, tipo, talle, precio){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.tipo = this.asignarTipo(tipo);
        this.talle = this.asignarTalle(this.asignarTipo(tipo), talle);
        this.precio = precio;
    }

    //Métodos

    precioConImpuestos(impuestos){
        return this.precio + this.precio * impuestos / 100;
    }

    precioConDescuento(descuento){
        return this.precio - this.precio * descuento / 100;
    }

    asignarTipo(n){
        switch (n) {
            case 1:
              return `remera`;
            case 2:
                return `buzo`;
            case 3:
                return `short`;
            case 4:
                return `pantalon`;
            case 5:
                return `zapatillas`;
          }
    }

    asignarTalle(tipo, talle){
        if (tipo != `zapatillas`){
            switch (talle) {
                case 1:
                  return `S`;
                case 2:
                    return `M`;
                case 3:
                    return `L`;
                case 4:
                    return `XL`;
            }
        }
        else {
            return talle;
        }
    }
    
    //ToString

    toString(){
        return `Nombre: ${this.nombre} | Descripción: ${this.descripcion} | Tipo: ${this.tipo} | Talle: ${this.talle} | Precio: $${this.precio}`;
    }

    toStringConImpuestos(impuestos){
        return `Impuestos: %${impuestos} | Precio con Impuestos: ${this.precioConImpuestos(impuestos)}`
    }

    toStringConDescuento(descuento){
        return `Descuento: %${descuento} | Precio con descuento: ${this.precioConDescuento(descuento)}`
    }

}

//ShopCart (Es una colección de objetos Producto)

class ShopCart{

    constructor(usuario){
        this.productos = [];
        this.precio = 0;
        this.usuario = usuario;
        this.fecha = new Date();
    }

    limpiarProductos(){
        this.productos = [];
    }
    
    mostrarCarrito(){
        this.calcularPrecio();
        let string = `Precio del carrito: $${this.precio}\n\n`;

        if(this.productos.length == 0){
            alert("No hay elementos en el carrito");
        }
        else {
            this.productos.forEach( (producto) => {
                string += `\n${producto.toString()}\n`;
            })
            alert(string);
        }
    }

    mostrarNombres(){
        const listaNombres = this.productos.map(producto => producto.nombre)
        alert(listaNombres);
    }
    
    addItem(item){
        this.productos.push(item);
    }

    quitarItem(item){
        //desarrolar
    }

    calcularPrecio(){
        const total = this.productos.reduce((precioTotal, producto) => precioTotal + producto.precio, 0);
        this.precio = total;
    }
    
    aplicarDescuento(descuento){
        const total = this.productos.reduce((precioTotal, producto) => precioTotal + producto.precioConDescuento(descuento), 0);
        this.precio = total;
    }
    
    
    aplicarImpuestos(impuestos){
        const total = this.productos.reduce((precioTotal, producto) => precioTotal + producto.precioConImpuestos(impuestos), 0);
        this.precio = total;
    }
    

}

//Usuario

class Usuario{
    //El constructor se usará mas adelante
    constructor(nombre, apellido, usuario, contrasenia){
        this.nombre = nombre;
        this.apellido = apellido;
        this.usuario = usuario;
        this.contrasenia = contrasenia;
    }

    crearUsuario(){
        alert("Creación de usuario");
        this.nombre = prompt("Ingrese su nombre: ");
        //this.apellido = prompt("Ingrese su apellido: ");
        //this.usuario = prompt("Ingrese el usuario a usar: ");
        this.contrasenia = prompt("Ingrese su contraseña: ");
    }

}


//funciones

function iniciarSesion(){
    let usuario = new Usuario;
    usuario.crearUsuario();    
    document.getElementById("saludo").textContent = `Hola ${usuario.nombre}!`;
    return usuario;

}

function mostrarProductos(){
    alert(stringItems);
}

function cambiarPrecio(){
    carrito.calcularPrecio();
    console.log(carrito.precio);
    document.getElementById("precio__valor").textContent = `${carrito.precio}`;
}

function comprar(){
    let compra;
    
    compra = prompt(`Ingrese el número de lo que desea comprar\n\n${stringItems}\n`);
    compra = parseInt(compra);
    if (compra>= 0 && compra <= 6){
        carrito.addItem(productosEnVenta[compra]);
        alert(`Se agregó:\n${productosEnVenta[compra].toString()}`)
    }

    cambiarPrecio();
}

function quitar(){
    //en proceso
}

function mostrarCarrito(){
    carrito.mostrarCarrito();
}

function descuento(){
    let descuento = prompt("Ingrese cupón de descuento:");
    //ejemplo que el cupón ingresado es de 10%
    descuento = 10;
    carrito.aplicarDescuento(descuento);
    document.getElementById("precio__valor").textContent = `${carrito.precio}`;
}

function impuesto(){
    //ejemplo que el cupón ingresado es de 10%
    let impuestos = 21;
    carrito.aplicarImpuestos(impuestos);
    document.getElementById("precio__valor").textContent = `${carrito.precio}`;
}

function limpiarProductos(){
    carrito.limpiarProductos();
    cambiarPrecio();
}

//Simulacion

let usuario = iniciarSesion();
let carrito = new ShopCart(usuario);

//Creamos productos y los agregamos a una lista

let remeraRoja = new Producto(`Remera Roja`, `Remera Roja de algodón`, 1, 2, 1000);
let remeraNegra = new Producto(`Remera Negra`, `Remera Negra de tela deportiva`, 1, 3, 950);
let buzoLiso = new Producto(`Buzo simple`, `Buzo sin estampado 100% algodón`, 2, 3, 650);
let shortAdidas = new Producto(`Short Adidas`, `Short de la selección Argentina`, 3, 2, 599);
let pantalonDeportivo = new Producto(`Pantalon Nike`, `Pantalon Nike de tela deportiva`, 4, 4, 750);
let zapatillas = new Producto(`Zapatillas Jordan`, `Zapatillas edición coleccionista Jordan`, 5, 44, 7590);

let productosEnVenta = [remeraRoja, remeraNegra, buzoLiso, shortAdidas, pantalonDeportivo, zapatillas];

let = stringItems = `Listado de productos:\n`
let i;

productosEnVenta.forEach( (producto)=>{
    i = productosEnVenta.indexOf(producto);;
    stringItems = `${stringItems}\nProducto ${i}: ${producto.toString()}\n`;
});