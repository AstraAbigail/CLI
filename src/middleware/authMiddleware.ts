import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const SECRET_KEY = "clavesecretaId"
  
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

export default authMiddleware
