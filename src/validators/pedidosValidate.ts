import { z } from "zod"


  const schema = z.object({
    cliente: z.string().min(6),
    dniCliente:z.number().positive().min(8,"Debe tener 8 caracteres"),
    direccion:z.string().min(10),
    tecnicoAsignado: z.string().min(3),
    fechaProgramada:z.string(),
    estado:z.string().min(3)
  })
  


export const createPedidosSchema = schema

export const updatePedidosSchema = schema.partial()