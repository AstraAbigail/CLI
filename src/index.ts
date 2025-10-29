import express, {Request,Response } from "express"
import cors from "cors"
import fs from "node:fs"

import moongose, { Schema, Document, Types} from "mongoose"

const PORT = 3000
/*coneccion a la base de datos en mongoDB*/
const URI_BD = "mongodb://localhost:27017/db_utn"

// const pedidos = JSON.stringify(fs.readFileSync("../pedidos.json","utf-8"))

const app = express()
app.use(cors())
app.use(express.json())


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
    console.log("Error al conectarse a la BD ❌",e.name)    
  }
}


//Estado de la conexion
app.get("/", (request: Request, response: Response) => { 
  response.json({status:true})
})

//Buscar Pedido por ID
app.get("/pedidos/:id", async(request: Request, response: Response):Promise<Response | void> => { 
  try {
    const id = request.params.id
        
    const pedidoBuscado = await MPedido.findById(id)

    if (!Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "ID invalido" })
    }
    response.status(200).json({ pedidoBuscado })
  } catch (error) {
    response.status(400).json({error: "Error al obtener pedido"})  
  }        
})

//PEDIDOS SEGUN ESTADO -uso body, porque va a venir de algun filtro, select desde la UI
// app.get("/pedidos", async (req: Request, res: Response):Promise<Response | void >=> { 
//   const estado = req.body
//   console.log(estado)
//   const pedidosPendientes = await MPedido.find({ estado })
//   console.log(pedidosPendientes)
//   if (!pedidosPendientes) { 
//     return res.status(404).json({message:"No hay pedidos con estado pendiente"})
//   }   
//   res.status(200).json({pedidosPendientes})       
// })

//Mostrar todos los pedidos
// app.get("/pedidos", async (request: Request, response: Response): Promise< Response | void> => { 
//   const pedidosBuscado = await MPedido.find()
//   response.status(200).json({pedidosBuscado})  
// })


//eliminar pedido
app.delete("/pedidos/:id", async (req: Request, res: Response): Promise<void | Response> => {
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
app.post("/pedidos", async (req: Request, res: Response): Promise <void | Response> => { 
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

})

//MODIFICAR PEDIDO
app.patch("/pedidos/:id", async (req: Request, res: Response): Promise<void | Response> => { 
  try {
    const { id } = req.params
    const {body} = req

    const { cliente, dniCliente, direccion, tecnicoAsignado, fechaProgramada, estado } = body

    const updates = { cliente, dniCliente, direccion, tecnicoAsignado, fechaProgramada, estado }
    
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

//endpoint para comunicar el estado interno de la API
app.listen(PORT, () => { 
  console.log(`Servidor en escucha en el puerto http://localhost:${PORT}`)
  connect_BD(URI_BD)
})