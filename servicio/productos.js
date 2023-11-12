// import ModelMem from "../model/DAO/productosMem.js" //aca lee el archivo de productos en memoria (hardcodeados)
// import ModelFile from "../model/DAO/productosFile.js"  //aca lee el archivo productosFile

import config from "../config.js"
import ModelFactory from "../model/DAO/productosFactory.js"
import { validar } from "./validaciones/productos.js"

class Servicio {
   constructor() {
      // this.model = new ModelMem()
      this.model = ModelFactory.get(config.MODE_PERSISTENCIA)

   }
   obtenerProductos = async (id) => {
      const productos = await this.model.obtenerProductos(id)
      return productos
   }

   calculoProductos = async (tipo) => {  //funcion para  calcular el promedio del precio de todos los productos existentes, ruta: http://localhost:8082/api/productos/calculo/promedio-precios
      let resultado = "calculo no soportado"
      switch (tipo) {
         case "promedio-precios":
            const productos = await this.model.obtenerProductos() //obtiene los productos del modelo
            const sumatoria = productos.reduce((acumulador, producto) => acumulador + producto.precio, 0)
            const promedio = sumatoria / productos.length
            resultado = Number(promedio.toFixed(2))  //tofixed es para limitar a dos decimales el resultado
            break
         default:
            break
      }
      return { [tipo]: resultado } //esto es un objeto con la clave variable, tipo puede ser; promedio-precio etc etc
   }

   guardarProductos = async (producto) => {
      const res = validar(producto)
      if(res.result){
         return await this.model.guardarProducto(producto)
      }else{
         console.log(res.error)
         throw res.error
      }
    
   }

   actualizarProductos = async (id, producto) => {
      return await this.model.actualizarProducto(id, producto)
   }

   borrarProductos = async (id) => {
      return await this.model.borrarProducto(id)
   }
}

export default Servicio
