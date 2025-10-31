import { model, Model, Schema } from "mongoose"
import IPedido from "../interfaces/IPedido"


const PedidoSchema = new Schema<IPedido>({
  cliente: { type: String, required: true },
  dniCliente:{ type: Number, required: true }, 
  direccion:{ type: String, required: true },  
  tecnicoAsignado:{ type: String, required: true },
  fechaProgramada:{ type: String, required: true },
  estado: { type: String, required: true }
})

const MPedido: Model<IPedido> = model("Pedido", PedidoSchema)

export default MPedido 