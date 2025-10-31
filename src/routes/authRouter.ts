import { Router } from "express"
import authControllers from "../controllers/authControllers"




const authRouter = Router()


authRouter.post("/register", authControllers.register)

authRouter.post("/login", authControllers.login)





export default authRouter