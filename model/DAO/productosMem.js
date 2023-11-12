

class ModelMem {
    constructor() {
        this.productos = [
            { id: 1, nombre: "TV", precio: 123000.45, stock: 55 },
            { id: 2, nombre: "Mesa", precio: 65078, stock: 20 },
            { id: 3, nombre: "Mouse", precio: 672.35, stock: 13 },
        ]

    }

    obtenerProductos = async (id) => {
        if (id) {
            const producto = this.productos.find(producto => producto.id == id)
            return producto || {}
        } else {
            return this.productos
        }
    }

    guardarProducto = async (producto) => {
        producto.id = parseInt(this.productos[productos.length - 1]?.id) + 1 //? optional chaining
        producto.precio = Number(producto.precio) //el producto que proviene del formulario, entra en formato string, hay que cambiarlo a number
        producto.stock = Number(producto.stock)// si no se cambia a number, despues no podemos hacer operaciones matematicas
        productos.push(producto)  //agrega el producto en el array del productos
        return producto
    }

    actualizarProducto = async (id, producto) => {
        producto.id = id //agregamos el id al producto

        const index = this.productos.findIndex(producto => producto.id == id)
        if (index != -1) {
            const productoAnt = this.productos[index]
            //SPREAD OPERATOR (...) + OBJECT MERGE
            //productoAnt =   { id: 2, nombre: "Mesa", precio: 65078, stock: 20 }
            // producto = {precio :777}
            // ----> productoNuevo ={...producAnt, ...productos}
            // 1) {...{ id: 2, nombre: "Mesa", precio: 65078, stock: 20 }, ... {precio :777}}
            // 2) { id: 2, nombre: "Mesa", precio: 65078, stock: 20, precio : 777 } ---> spread operator, saca los literales 
            // 3)  { id: 2, nombre: "Mesa", stock: 20, precio : 777 } ---> object merge, si se repiten los valores, queda solo la ultima ingresada

            const productoNuevo = { ...productoAnt, ...producto }
            this.productos.splice(index, 1, productoNuevo)
            return productoNuevo

        } else {
            this.productos.push(producto)
            return producto
        }
    }

    borrarProducto = async (id) => {
        let producto = {}

        const index = this.productos.findIndex(producto => producto.id == id)
        if (index != -1) {
            producto = this.productos.splice(index, 1)[0]
        }
        return producto
    }
}

export default ModelMem
