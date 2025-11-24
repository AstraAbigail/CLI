import { z } from "zod"


  const schema = z.object({
    cliente: z.string().length(20),
    dniCliente:z.number().positive().min(8,"Debe tener 8 caracteres"),
    direccion:z.string().length(30),
    tecnicoAsignado: z.string().length(15),
    fechaProgramada:z.string(),
    estado:z.string()
  })
  


export const createPedidosSchema = schema

export const updatePedidosSchema = schema.partial()