import { Types } from "mongoose"
import MPedido from "../model/PedidoModel"
import { Response, Request } from "express"
import { createPedidosSchema, updatePedidosSchema } from "../validators/pedidosValidate"

class PedidosController { 
  
  static getAllPedidos = async (req: Request, res: Response): Promise<Response | void> => {
    try {

      const {cliente, dniCliente, tecnicoAsignado, fechaDesde, fechaHasta, estado}= req.query
      const filter: any = {}

      if (cliente) filter.cliente = new RegExp(String(cliente), "i")
      if (dniCliente) filter.dniCliente = Number(dniCliente)
      if (tecnicoAsignado) filter.tecnicoAsignado = new RegExp(String(tecnicoAsignado), "i")
      if (fechaDesde || fechaHasta) {
        filter.fechaProgramada = {}
        if (fechaDesde) filter.fechaProgramada.$gte = fechaDesde
        if (fechaHasta) filter.fechaProgramada.$lte = fechaHasta
      }
 
      
      const pedidosBuscado = await MPedido.find(filter)
      res.status(200).json({success: true, data: pedidosBuscado })
    } catch (e) {
      const error = e as Error
      res.status(500).json({success: false, error: error.message })
   }
  }

  static getPedidoByID = async(request: Request, response: Response):Promise<Response | void> => { 
    try {
      const id = request.params.id        
      const pedidoBuscado = await MPedido.findById(id)

      if (!Types.ObjectId.isValid(id)) {
        return response.status(400).json({success:false , error: "ID invalido" })
      }
      response.status(200).json({ success:true, data:pedidoBuscado })
    } catch (e) {
      const error = e as Error
      response.status(500).json({success:false, error: error.message})  
    }        
  }


  static addPedido = async (req: Request, res: Response): Promise<void | Response> => { 
    try {
      const { body } = req
      const { cliente, dniCliente, direccion, tecnicoAsignado, fechaProgramada, estado } = body

      console.log(body)
      
      if (!cliente || !dniCliente || !direccion || !tecnicoAsignado || !fechaProgramada || !estado) { 
        return res.status(400).json({success:false, error:"Todos los datos son requeridos" })
      }
     
      const validator = createPedidosSchema.safeParse(body)
      console.log(validator)
      if (!validator.success) {
        return res.status(400).json({
          success: false,  error: validator.error.message
        })     
      }
      

      const nuevoPedido = new MPedido(validator.data)
      await nuevoPedido.save()
      //mando datos y se agregan
      res.status(201).json({success:true, data: nuevoPedido })

    } catch (error) {
      res.status(500).json({success:false, error:"Error interno del servidor"})
    }
    
  }


  static updatePedido = async (req: Request, res: Response): Promise<void | Response> => { 
    try {
      const { id } = req.params
      const {body} = req

      //return implicito
      if (!Types.ObjectId.isValid(id)) res.status(400).json({ error: "ID Inválido" })
      

      const { cliente, dniCliente, direccion, tecnicoAsignado, fechaProgramada, estado } = body

      //objeto con las actualizaciones
      const updates = { cliente, dniCliente, direccion, tecnicoAsignado, fechaProgramada, estado }
      
      const validator = updatePedidosSchema.safeParse(updates)
    

        //new:true, devuelve el objeto actualizado
      const pedido = await MPedido.findByIdAndUpdate(id, validator.data, { new: true })      
      if (!pedido) {
        return res.status(404).json({ error: "Producto no encontrado" })
      }
      res.json(pedido)

      
    } catch (e) { 
      const error = e as Error
      res.status(500).json({ error: error.message })
    }

  }


  static deletePedido = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { id } = req.params

      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({success:false, error: "ID Inválido" });
      }

      const pedido = await MPedido.findByIdAndDelete(id)
      res.json({success:true,data:pedido})

    } catch (e) {
      const error = e as Error
      res.status(500).json({success:false, error: error.message })
    }
  }
}



export default PedidosController