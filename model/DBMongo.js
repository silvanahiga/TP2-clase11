import { MongoClient } from "mongodb"
import config from "../config.js"

class CnxMongoDB {
    static client = null
    static connection = false
    static db = null

    static conectar = async () => {
        try {
            console.log("conectando a la base de datos...")
            CnxMongoDB.client = new MongoClient(config.STRCNX)  //objeto de conexion
            await CnxMongoDB.client.connect()
            console.log("base de datos conectada")

            CnxMongoDB.db = CnxMongoDB.client.db(config.BASE)
            CnxMongoDB.connection = true

        } catch (error) {
            console.log("error en la conexion de base de datos: " + error.message)
        }

    }

    static desconectar = () => {


    }
}

export default CnxMongoDB