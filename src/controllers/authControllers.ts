import {Response, Request  } from "express"
import userModel from "../model/UserModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import dotenv from "dotenv"
dotenv.config()

const SECRET_KEY = String(process.env.JWT_SECRET);

class AuthController { 

  static register = async (req: Request, res: Response): Promise<void | Response> => { 

    try {
      const { body } = req
      const { email, password } = body
      
      if (!email || !password) { 
        return res.status(404).json({success:false, error:"datos invalidos"})
      }    

      //obtener HASH y darselo de valora a la contraseña
      const hash = await bcrypt.hash(password,10)

      const newUser = new userModel({ email, password:hash })
      
      await newUser.save()
      res.json({ success:true,data:newUser })

    } catch (e) {
      const error = e as Error
      switch (error.name) { 
        case "MongoServerError":
          return res.status(409).json({success:false, error: "Usuario ya existente"})
      }   
    }    
  }

  static login = async (req: Request, res: Response): Promise<Response | void> => {
    
    try {
      const { email, password } = req.body
      
      if (!email || !password) {
        return res.status(401).json({success:false, error: "Faltan datos" })
      }

      const user = await userModel.findOne({ email })

      if (!user) {
        return res.status(401).json({success:false, error: "No Autorizado" })
      }
      
      const isValid = await bcrypt.compare(password, user.password)
      
      if (!isValid) {
        return res.status(401).json({success:false, error: "No Autorizado" })
      }
      //permiso especial -> sesion de uso    

      const token = jwt.sign({ id: user._id },SECRET_KEY,{ expiresIn: "1h" });
      res.json({success:true, data:token})

    } catch (e) {
      const error = e as Error
      res.status(500).json({ success:false, error: error.message })
    } 
    
  }

}

export default AuthController