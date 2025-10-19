
import moongose, { Schema, Document} from "mongoose"

import { writeDb } from "../db/connection";

import {  buscarPedido } from "../utils/BuscarUsuario"
import { info } from "node:console";

interface IPedido {
  // id: `${string}-${string}-${string}-${string}-${string}`;
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

const URI_BD = "mongodb://localhost:27017/db_utn"

const connect_BD = async (URI: string)=> {
  try {
    await moongose.connect(URI)
    console.log("Conectado a la base de datos ✅")
  } catch (error) {
    const e = error as Error //fuerza que se trate como error
    console.log("Error al conectarse a la BD ❌",e.name)
    
  }
}


const main = async (argumentos: any[], accion: string, pedidos: any[]) => {
  connect_BD(URI_BD)
  switch (accion) {
    
    case "info":
      console.log("-------COMANDOS VÁLIDOS-------")
      console.log("Ingrese 1 para -> ingresar Pedido seguido de -> ",
        "nombre del cliente - ",
        "direccion - ",
        "tecnicoAsignado(Camila - Diego - Hugo) - ",
        " fechaProgramada(año - mes - dia) - ",
        "estado(pendiente - completado - en proceso). ")
      console.log("Ingrese 2 para -> modificar Pedido  seguido de -> DNI del cliente dato a modificar direccion tecnico fecha estado",
        "si es un solo campo el que va a modificar, en el resto ingrese '-' ")
      console.log("Ingrese 3 para -> eliminar Pedido   seguido de -> DNI del cliente")
      console.log("Ingrese 4 para -> ver Pedido xxxx-xx-xx seguido de -> fecha programada la visita (año-mes-dia) ")
      console.log("Ingrese 5 para -> ver Pedidos Finalizados -> ver todos los pedidos con estado 'COMPLETADO'")
      console.log("Ingrese 6 para -> ver Pedidos Pendientes  -> ver todos los pedidos con estado 'PENDIENTE'")
      console.log("Ingrese 7 para -> Buscar Pedidos seguido de  -> DNI del cliente")
      console.log("Ingrese 8 para -> Listar todos los Pedidos")

      break;
    case "1":
      // console.log(argumentos[3])
      if (argumentos[3]) {
        console.log("------NUEVO PEDIDO------")
        const nombre = argumentos[3]
        const dni = Number(argumentos[4])
        const direccionC = argumentos[5]
        const tecnicoAsignadoC = argumentos[6]
        const fechaVisita = argumentos[7]
        const estadoC = argumentos[8]
        
        
        const nuevoPedido: IPedido = {
          // id : crypto.randomUUID(),
          cliente: nombre,
          dniCliente: dni,
          direccion: direccionC,
          tecnicoAsignado: tecnicoAsignadoC,
          fechaProgramada: fechaVisita,
          estado: estadoC,
        }


        if (nombre && dni && direccionC && tecnicoAsignadoC && fechaVisita && estadoC) {
          const pedidoBuscado = buscarPedido(argumentos[4],pedidos)
          if (pedidoBuscado == undefined) {
            pedidos.push(nuevoPedido)
            writeDb(pedidos)           
            console.log("pedido agregado")
            console.log(pedidos)
          } else {
            console.log("El usuario ya esta en la base de datos", pedidoBuscado)
          }
        } else {
          console.log("Faltan datos")
        }

      } else {
        console.log("Ingrese los datos correspondientes ")
      }
      break;
    case "2":
      console.log("------MODIFICAR PEDIDO ------")
      
      //Tomo los datos
      const dni = Number(argumentos[3])
      const direccionC = argumentos[4]
      const tecnicoAsignadoC = argumentos[5]
      const fechaVisita = argumentos[6]
      const estadoC = argumentos[7]
      //busco el pedido a modificar
      const pedidoAmodificar = buscarPedido(argumentos[3], pedidos)
      // console.log(pedidoAmodificar,"---------------------------")    

      if (pedidoAmodificar) {
        if (direccionC !== "-") pedidoAmodificar.direccion = direccionC
        if (tecnicoAsignadoC !== "-") pedidoAmodificar.tecnicoAsignado = tecnicoAsignadoC
        if (fechaVisita !== "-") pedidoAmodificar.fechaProgramada = fechaVisita
        if (estadoC !== "-") pedidoAmodificar.estado = estadoC
        writeDb(pedidos)        
        console.log("✅ Campos actualizados")
        console.log(pedidos)
      }
      break
    case "3":
      console.log("------ELIMINAR PEDIDO------")

      const DNI = argumentos[3]
      if (!DNI) {
        console.log("Ingrese el DNI del cliente seguido de la opcion 3")
      } else {

        const indice = pedidos.findIndex((pedido) => pedido.dniCliente === Number(DNI))

        if (indice === -1) {
          console.log("El pedido no existe")
        } else {
          console.log("---PEDIDO BORRADO---")
          const pedidoBorrado = pedidos.splice(indice, 1)
          // console.log(pedidoBorrado, "<- pedido borrado")
          
          writeDb(pedidos)  
          console.log(pedidos,"PEDIDOS ACTUALIZADOS")
        }
        
      }
      break;
    case "4":
      console.log("------VER VISITAS DEL PEDIDO A LA FECHA ", argumentos[3], "------")
      console.log(argumentos[3])
      if (!argumentos[3]) {
        console.log("Ingrese 'verPedido xxxx-xx-xx (año-mes-dia)', para poder visualizar el pedido a esa fecha")
      } else {
        const pedidoEncontrado = pedidos.find((pedido) => pedido.fechaProgramada === argumentos[3])

        console.log(pedidoEncontrado)

      }
      break;
      
    case "5":
      console.log("------PEDIDOS FINALIZADOS------")
          
      let pedidosFinalizados: IPedido[] = []

      pedidos.forEach((pedido) => {
        if (pedido.estado === "completado") {
          pedidosFinalizados.push(pedido)
        }
      })

      if (pedidosFinalizados.length === 0) {
        console.log("No hay pedidos finalizados aún")
      } else {
        console.log(pedidosFinalizados)
      }
      break;
    case "6":
      console.log("------PEDIDOS PENDIENTES------")

      let pedidosPendientes: IPedido[] = []

      pedidos.forEach((pedido) => {
        if (pedido.estado === "pendiente") {
          pedidosPendientes.push(pedido)
        }
      })

      if (pedidosPendientes.length === 0) {
        console.log("No hay pedidos finalizados aún")
      } else {
        console.log(pedidosPendientes)
      }

      break;
    case "7":
      console.log("------BUSCAR PEDIDO------")
      if (!argumentos[3]) {
        console.log("Ingrese DNI del cliente a buscar ")
      } else {
        
        const pedido = buscarPedido(argumentos[3],pedidos)
        //   const clienteEspecifico = pedidosServicio.find((cliente) => cliente.dniCliente === Number(argumentos[3]))
        console.log(pedido)
      }
      break;
    case "8":
      // console.log(pedidos)
      const pedidosTodos = await MPedido.find({})
      console.log(pedidosTodos)
      break;
    default: console.log("Comando invalido, ingrese 'info' para ver todos los comandos")
  }
}
export { main }