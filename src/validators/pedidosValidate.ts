import { z } from "zod"


  const schema = z.object({
    cliente: z.string().min(4).length(20),
    dniCliente:z.number().positive().min(8,"Debe tener 8 caracteres").max(8),
    direccion:z.string().length(30),
    tecnicoAsignado: z.string().length(15),
    fechaProgramada:z.date(),
    estado:z.string()
  })
  


export const createPedidosSchema = schema

export const updatePedidosSchema = schema.partial()