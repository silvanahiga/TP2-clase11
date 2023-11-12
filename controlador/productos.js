import Servicio from "../servicio/productos.js"

class Controlador {
    constructor() {
        this.servicio = new Servicio()
    }

    obtenerProductos = async (req, res) => {  //con id en la ruta para devolver el producto buscado
        const { id } = req.params
        const productos = await this.servicio.obtenerProductos(id)
        res.json(productos)
    }

    calculoProductos = async (req, res) => {  //para calcular un producto
        const { tipo } = req.params
        const resultado = await this.servicio.calculoProductos(tipo)
        res.json(resultado)
    }

    guardarProducto = async (req, res) => {
        try{
            const producto = req.body
            const productoGuardado = await this.servicio.guardarProductos(producto)
            res.json(productoGuardado)  //cuando se guarda un producto, se muestra el producto guardado
            // res.redirect("/") //cuando se guarda un producto, se dirige a la vista del form
        }catch(error){
            res.status(500).json({error: error.message})
        }
     

    }

    actualizarProducto = async (req, res) => {
        const { id } = req.params
        const producto = req.body
        const productoActualizado = await this.servicio.actualizarProductos(id, producto)
        res.json(productoActualizado)
    }

    borrarProducto = async (req, res) => {
        const { id } = req.params
        const productoBorrado = await this.servicio.borrarProductos(id)
        res.json(productoBorrado)
    }
}
export default Controlador



