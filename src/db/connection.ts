
import fs from "node:fs"

const DB_PATH = "./src/pedidos.json"

const readDb = () => JSON.parse(fs.readFileSync(DB_PATH, "utf-8"))
const writeDb = (pedidos: any) => fs.writeFileSync(DB_PATH, JSON.stringify(pedidos))

export { readDb, writeDb }