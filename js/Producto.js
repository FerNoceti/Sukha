class Producto{
    
    //Constructor
    
    constructor(nombre, descripcion, tipo, precio){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.tipo = this.asignarTipo(tipo);
        this.precio = precio; 
        this.talle = "Sin Definir";
    }

    //Métodos

    setTalle(talle){
        this.talle = talle;
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
};

export{Producto};