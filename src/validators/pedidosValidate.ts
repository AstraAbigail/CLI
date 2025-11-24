import { z } from "zod"


  const schema = z.object({
    cliente: z.string(),
    dniCliente:z.number().positive().min(8,"Debe tener 8 caracteres"),
    direccion:z.string(),
    tecnicoAsignado: z.string(),
    fechaProgramada:z.string(),
    estado:z.string()
  })
  


export const createPedidosSchema = schema

export const updatePedidosSchema = schema.partial()