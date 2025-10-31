import { Router } from "express"
import authControllers from "../controllers/authControllers"




const authRouter = Router()


authRouter.post("/auth/register", authControllers.register)

authRouter.post("/auth/login", authControllers.login)





export default authRouter