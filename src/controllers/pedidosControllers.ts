import { Types } from "mongoose"
import MPedido from "../model/PedidoModel"
import {Response, Request  } from "express"


const getAllPedidos = async (__: Request, res: Response): Promise<Response | void> => {
  try {
    const pedidosBuscado = await MPedido.find()
    res.status(200).json({success: true, data: pedidosBuscado })
  } catch (e) {
    const error = e as Error
    res.status(500).json({success: false, error: error.message })
  }
}

const getPedidoByID = async(request: Request, response: Response):Promise<Response | void> => { 
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


const addPedido = async (req: Request, res: Response): Promise<void | Response> => { 
  try {
    const { body } = req
    const { cliente, dniCliente, direccion, tecnicoAsignado, fechaProgramada, estado } = body
    
    if (!cliente || !dniCliente || !direccion || !tecnicoAsignado || !fechaProgramada || !estado) { 
      return res.status(400).json({success:false, error:"Datos invalidos" })
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
    res.status(201).json({success:true, data: nuevoPedido })

  } catch (error) {
    res.status(500).json({success:false, error:"Error interno del servidor"})
  }
  
}


const updatePedido = async (req: Request, res: Response): Promise<void | Response> => { 
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

}


const deletePedido = async (req: Request, res: Response): Promise<void | Response> => {
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


export default { getAllPedidos, getPedidoByID, addPedido, updatePedido, deletePedido }