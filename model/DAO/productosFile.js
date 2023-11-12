// const productos = [
//     { id: 1, nombre: "TV", precio: 123000.45, stock: 55 },
//     { id: 2, nombre: "Mesa", precio: 65078, stock: 20 },
//     { id: 3, nombre: "Mouse", precio: 672.35, stock: 13 },
// ]
import fs from "fs"


class ModelFile {

    constructor() {
        this.nombreArchivo = "productos.json"
    }


    leerArchivo = async nombre => {  // este metodo lee el archivo que se encuentra en el txt/json
        let productos = []
        try {
            productos = JSON.parse(await fs.promises.readFile(nombre, "utf-8"))  //deserializar el json
        }
        catch {
        }
        return productos

    }

    escribirArchivo = async (nombre, productos) => { //este metodo sirve para introducir nuevos datos al json
        await
            fs.promises.writeFile(nombre, JSON.stringify(productos, null, "\t")) //serializar el json
    }


    obtenerProductos = async (id) => { //devuelve si es que existe un objeto con los productos
        try {
            const productos = await this.leerArchivo(this.nombreArchivo)  //leer el archivo
            if (id) {
                const producto = productos.find(producto => producto.id == id)  // si se encuentran los productos
                return producto || {}
            } else {
                return productos
            }
        } catch {
            return id ? {} : [] //esto es por si devuelve algo serializado o sin serializar (objeto vacio o array vacio)
        }
    }

    guardarProducto = async (producto) => {
        const productos = await this.leerArchivo(this.nombreArchivo)  //leer el archivo

        // producto.id = parseInt(productos[productos.length - 1]?.id) + 1 //? optional chaining
        producto.id = String(parseInt(productos[productos.length - 1]?.id || 0) + 1) //? optional chaining
        producto.precio = Number(producto.precio) //el producto que proviene del formulario, entra en formato string, hay que cambiarlo a number
        producto.stock = Number(producto.stock)// si no se cambia a number, despues no podemos hacer operaciones matematicas
        productos.push(producto)  //agrega el producto en el array del productos

        await this.escribirArchivo(this.nombreArchivo, productos) //para guardar un producto hay que sobreescribir el archivo

        return producto
    }

    actualizarProducto = async (id, producto) => {
        producto.id = id //agregamos el id al producto
        const productos = await this.leerArchivo(this.nombreArchivo)  //leer el archivo


        const index = productos.findIndex(producto => producto.id == id)
        if (index != -1) {
            const productoAnt = productos[index]
            //SPREAD OPERATOR (...) + OBJECT MERGE
            //productoAnt =   { id: 2, nombre: "Mesa", precio: 65078, stock: 20 }
            // producto = {precio :777}
            // ----> productoNuevo ={...producAnt, ...productos}
            // 1) {...{ id: 2, nombre: "Mesa", precio: 65078, stock: 20 }, ... {precio :777}}
            // 2) { id: 2, nombre: "Mesa", precio: 65078, stock: 20, precio : 777 } ---> spread operator, saca los literales 
            // 3)  { id: 2, nombre: "Mesa", stock: 20, precio : 777 } ---> object merge, si se repiten los valores, queda solo la ultima ingresada

            const productoNuevo = { ...productoAnt, ...producto }
            productos.splice(index, 1, productoNuevo)
            await this.escribirArchivo(this.nombreArchivo, productos) //para guardar un producto hay que sobreescribir el archivo
            return productoNuevo

        } else {
            productos.push(producto)
            await this.escribirArchivo(this.nombreArchivo, productos) //para guardar un producto hay que sobreescribir el archivo
            return producto
        }
    }

    borrarProducto = async (id) => {
        let producto = {}
        const productos = await this.leerArchivo(this.nombreArchivo)  //leer el archivo
        const index = productos.findIndex(producto => producto.id == id)  //buscar producto por id
        if (index != -1) {
            producto = productos.splice(index, 1)[0] //si se encuentra se borra
            await this.escribirArchivo(this.nombreArchivo, productos) //para guardar un producto hay que sobreescribir el archivo
        }
        return producto
    }

}
export default ModelFile
