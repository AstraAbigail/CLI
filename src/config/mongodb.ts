import { connect } from "mongoose"



const connectBD = async ():Promise<void> => {
  const URI_BD = "mongodb://localhost:27017/db_utn"
  try {
    await connect(URI_BD)
    console.log("Conectado a la base de datos ✅")
  } catch (error) {
    const e = error as Error //fuerza que se trate como error
    console.log("Error al conectarse a la BD ❌", e.name)   
    process.exit(1)
  }
}

export default connectBD 