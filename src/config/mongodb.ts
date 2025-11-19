import { connect } from "mongoose"
import dotenv from "dotenv"
dotenv.config()


const connectBD = async ():Promise<void> => {
  const URI_DB =process.env.URI_DB!
  console.log("uri_db:",URI_DB)
  try {
    await connect(URI_DB)
    console.log("Conectado a la base de datos ✅")
  } catch (error) {
    const e = error as Error //fuerza que se trate como error
    console.log("Error al conectarse a la BD ❌", e.name)   
    process.exit(1)
  }
}

export default connectBD 