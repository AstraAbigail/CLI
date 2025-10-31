import express, {NextFunction, Request,Response } from "express"
import cors from "cors"
import fs from "node:fs"

import moongose, { Schema, Types, Model, model} from "mongoose"
import e from "express"

import bcrypt from "bcryptjs"

import jwt, { decode } from "jsonwebtoken"

import connectBD from "./config/mongodb"
import IUser from "./interfaces/IUser"
import IPedido from "./interfaces/IPedido"

import MPedido  from "./model/PedidoModel"
import userModel from "./model/UserModel"

import pedidoRouter from "./routes/pedidosRouter"



//comunica a todo el proyecto que si la request tiene una prop user, la acepte
declare global {
  namespace Express { 
    interface Request { 
      user?:any
    }
  }
 }

const PORT = 3000
const SECRET_KEY = "clavesecretaId"

const app = express()
app.use(cors())
app.use(express.json())

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

app.use("/pedidos", pedidoRouter)


//.use para cualquier ruta -> esa es la respuesta no es necesario poner ("") como primer parametro
app.use( (req: Request, res: Response) => {
  res.status(404).json({error:"El recuerso no se encuentra"})
})

//endpoint para comunicar el estado interno de la API
app.listen(PORT, () => { 
  console.log(`Servidor en escucha en el puerto http://localhost:${PORT}`)
  connectBD()
})