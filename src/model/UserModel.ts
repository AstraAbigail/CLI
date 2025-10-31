import { model, Model, Schema } from "mongoose"
import IUser from "../interfaces/IUser"

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password:{type:String, requere:true}
}, {
  versionKey:false
})
const userModel: Model<IUser> = model("User", userSchema)

export default userModel