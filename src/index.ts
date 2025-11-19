import express, {Request,Response } from "express"
import cors from "cors"
import connectBD from "./config/mongodb"
import pedidoRouter from "./routes/pedidosRouter"
import authRouter from "./routes/authRouter"
import morgan from "morgan"
// import authMiddleware from "./middleware/authMiddleware"
import limiter from "./middleware/rateLimitMiddleware"
import IUserTokenPayload from "./interfaces/IUserTokenPayload"
import dotenv from "dotenv"
dotenv.config()


//comunica a todo el proyecto que si la request tiene una prop user, la acepte
declare global {
  namespace Express { 
    interface Request { 
      user?:IUserTokenPayload
    }
  }
 }

const PORT = process.env.PORT
console.log(PORT)

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(limiter)

app.get("/", (__: Request, res: Response) => { 
  res.json({status:true})
})
app.use("/auth", limiter, authRouter)
app.use("/pedidos", pedidoRouter)


//.use para cualquier ruta -> esa es la respuesta no es necesario poner ("") como primer parametro
app.use( (__: Request, res: Response) => {
  res.status(404).json({success:false , error:"El recuerso no se encuentra"})
})

//endpoint para comunicar el estado interno de la API
app.listen(PORT, () => { 
  console.log(`Servidor en escucha en el puerto http://localhost:${PORT}`)
  connectBD()
})