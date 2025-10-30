import express, {ErrorRequestHandler, NextFunction, Request,Response } from "express"
import cors from "cors"
import fs from "node:fs"

import moongose, { Schema, Document, Types, Model, model} from "mongoose"
import e from "express"

import bcrypt from "bcryptjs"

import jwt, { decode } from "jsonwebtoken"

//comunica a todo el proyecto que si la request tiene una prop user, la acepte
declare global {
  namespace Express { 
    interface Request { 
      user?:any
    }
  }
 }


const PORT = 3000
/*coneccion a la base de datos en mongoDB*/
const URI_BD = "mongodb://localhost:27017/db_utn"
const SECRET_KEY = "clavesecretaId"



// const pedidos = JSON.stringify(fs.readFileSync("../pedidos.json","utf-8"))

const app = express()
app.use(cors())
app.use(express.json())

//interfaz para acceso de usuarios
interface IUser { 
  email: string,
  password: string
}
//versionKey, agrega un dato __v:0,sirve para ver cuantas veces se modifico un documento a mano. con False se lo sacamos.
const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password:{type:String, requere:true}
}, {
  versionKey:false
})

const userModel: Model<IUser> = model("User",userSchema)





interface IPedido {
  cliente: string;
  dniCliente: number,  
  direccion: string;  
  tecnicoAsignado: string;
  fechaProgramada: string;
  estado: string;
}
const PedidoSchema = new Schema<IPedido>({
  cliente: { type: String, required: true },
  dniCliente:{ type: Number, required: true }, 
  direccion:{ type: String, required: true },  
  tecnicoAsignado:{ type: String, required: true },
  fechaProgramada:{ type: String, required: true },
  estado: { type: String, required: true }
})
const MPedido = moongose.model<IPedido>("Pedido", PedidoSchema)

const connect_BD = async (URI: string)=> {
  try {
    await moongose.connect(URI)
    console.log("Conectado a la base de datos ✅")
  } catch (error) {
    const e = error as Error //fuerza que se trate como error
    console.log("Error al conectarse a la BD ❌", e.name)   
    process.exit(1)
  }
}

//Midderware
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization

  if (!header) {
    return res.status(401).json({ error: "Token requerido" })
  }
  const token = header?.split(" ")[1]

  console.log(token)

  try {
    //verificar token si es asi, se decodifica
    const logginUser = jwt.verify(token, SECRET_KEY);
     
    (res as any).IUser = logginUser
    
    next()
  } catch (e) {
    const error = e as Error
    res.status(401).json({ error: error.message })
  }
}



//autentificacion
app.post("/auth/register", async (req: Request, res: Response): Promise<void | Response> => { 

  try {
    const { body } = req
    const { email, password } = body
    
    if (!email || !password) { 
      return res.status(404).json("datos invalidos")
    }
    

    //obtener HASH y darselo de valora a la contraseña
    const hash = await bcrypt.hash(password,10)

    const newUser = new userModel({ email, password:hash })
    
    await newUser.save()
    res.json(newUser)

  } catch (e) {
    const error = e as Error
    switch (error.name) { 
      case "MongoServerError":
        return res.status(409).json({ message: "Usuario ya existente"})
    }
   
  }
   
  
})

app.post("/auth/login", async (req:Request, res:Response): Promise<Response | void> => {
  try {
    const { email, password } = req.body
    console.log(email, password)
    if (!email || !password) {
      return res.status(401).json({ error: "Faltan datos" })
    }

    const user = await userModel.findOne({ email })

    if (!user) {
      return res.status(401).json({ error: "No Autorizado" })
    }
    console.log(user.password)
    const isValid = await bcrypt.compare(password, user.password)
    console.log(isValid)
    if (!isValid) {
      return res.status(401).json({ error: "No Autorizado" })
    }
    //permiso especial -> sesion de uso
   

    const token = jwt.sign({id: user._id}, SECRET_KEY, {expiresIn:"1h"})
    res.json({token})

  } catch (e) {
    const error = e as Error
    res.status(500).json({ error: error.message })
  } 
  
})


//Estado de la conexion
app.get("/", (request: Request, response: Response) => { 
  response.json({status:true})
})

//Buscar Pedido por ID
app.get("/pedidos/:id",authMiddleware, async(request: Request, response: Response):Promise<Response | void> => { 
  try {
    const id = request.params.id
        
    const pedidoBuscado = await MPedido.findById(id)

    if (!Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "ID invalido" })
    }
    response.status(200).json({ pedidoBuscado })
  } catch (error) {
    response.status(500).json({error: "Error del servidor"})  
  }        
})


//Mostrar todos los pedidos
app.get("/pedidos", authMiddleware, async (req: Request, res: Response): Promise<Response | void> => { 
  try {
    
    const pedidosBuscado = await MPedido.find()
    res.status(200).json(pedidosBuscado)  
    
  } catch (e) {
    const error = e as Error
    res.status(500).json("Error")
  }
  
})


//eliminar pedido
app.delete("/pedidos/:id", authMiddleware,async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { id } = req.params

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID Inválido" });
    }

    const pedido = await MPedido.findByIdAndDelete(id)
    res.json(pedido)

  } catch (e) {
    const error = e as Error
    res.status(500).json({ error: error.message })
  }
})

//agregar pedido
app.post("/pedidos",authMiddleware, async (req: Request, res: Response): Promise<void | Response> => { 
  try {
    const { body } = req

    const { cliente, dniCliente, direccion, tecnicoAsignado, fechaProgramada, estado } = body
    
    if (!cliente || !dniCliente || !direccion || !tecnicoAsignado || !fechaProgramada || !estado) { 
      return res.status(400).json({ menssage:"Datos invalidos" })
    }

    const nuevoPedido = new MPedido({
      cliente,
      dniCliente,
      direccion,
      tecnicoAsignado,
      fechaProgramada,
      estado
    })
    await nuevoPedido.save()
    //mando datos y se agregan
    res.status(201).json(nuevoPedido)

  } catch (error) {
    res.status(500).json({ error:"Error interno del servidor"})
  }
  
})

//MODIFICAR PEDIDO
app.patch("/pedidos/:id", authMiddleware,async (req: Request, res: Response): Promise<void | Response> => { 
  try {
    const { id } = req.params
    const {body} = req

    //return implicito
    if (!Types.ObjectId.isValid(id)) res.status(400).json({ error: "ID Inválido" })
    

    const { cliente, dniCliente, direccion, tecnicoAsignado, fechaProgramada, estado } = body

    //objeto con las actualizaciones
    const updates = { cliente, dniCliente, direccion, tecnicoAsignado, fechaProgramada, estado }
    //new:true, devuelve el objeto actualizado
    const pedido = await MPedido.findByIdAndUpdate(id, updates, { new: true })
    
    if (!pedido) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }
    res.json(pedido)
  } catch (e) { 
    const error = e as Error
    res.status(500).json({ error: error.message })
  }

})

//para cualquier ruta -> esa es la respuesta no es necesario poner ("") como primer parametro
app.use( (req: Request, res: Response) => {
  res.status(404).json({error:"El recuerso no se encuentra"})
})


//endpoint para comunicar el estado interno de la API
app.listen(PORT, () => { 
  console.log(`Servidor en escucha en el puerto http://localhost:${PORT}`)
  connect_BD(URI_BD)
})