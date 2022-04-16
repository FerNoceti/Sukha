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