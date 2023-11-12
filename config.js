import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 8080

const MODE_PERSISTENCIA = process.env.MODE_PERSISTENCIA || "MEM" // MEM, FILE, MONGODB
// const STRCNX ="mongodb://127.0.0.1"  //string de conexion
const STRCNX = process.env.STRCNX || "mongodb://127.0.0.1"
const BASE = process.env.BASE || "test"

export default {
    PORT,
    MODE_PERSISTENCIA,
    STRCNX,
    BASE

}