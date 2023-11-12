import express from "express"
import RouterProductos from "./router/productos.js" //se importa router que esta en  productos
import config from "./config.js"
import CnxMongoDB from "./model/DBMongo.js"

const app = express()
app.use(express.json())  //mildware para procesar datos como un json
app.use(express.urlencoded({ extended: true })) //el formulario emite el dato en formato urlencoded, y de esta forma el server puede leerlo


app.use(express.static("public"))  //con esto linkea el server con el html


//----------------------- API RESFUL : Productos
app.use("/api/productos", new RouterProductos().start())
//----------------------- LISTEN DEL SERVIDOR EXPRESS
if (config.MODE_PERSISTENCIA == "MONGODB") {  // solo se conecta si el tipo de conexion es mongodb
    await CnxMongoDB.conectar()
}


const PORT = config.PORT
const server = app.listen(PORT, () => console.log(`Servidor express escuchando en http://localhost:${PORT}`))
server.on("error", error => console.log(`Error en servidor: ${error.message}`))
