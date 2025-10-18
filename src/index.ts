import { readDb } from "./db/connection"
import { main } from "./controllers/controller"

const argumentos = process.argv
const accion = argumentos[2]
const pedidos = readDb()
// console.log(pedidos,"<----index pedidos")
main(argumentos, accion, pedidos)