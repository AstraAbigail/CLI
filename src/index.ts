import crypto from  "node:crypto"

import { pedidosServicio } from "./utils/pedidos"

import {  buscarPedido } from "./utils/BuscarUsuario"

interface Pedido {
  id: `${string}-${string}-${string}-${string}-${string}`;
  cliente: string;
  dniCliente: number,  
  direccion: string;  
  tecnicoAsignado: string;
  fechaProgramada: string;
  estado: string;
}

const argumentos = process.argv
const accion = argumentos[2]

switch (accion) {
  
  case "info":
    console.log("-------COMANDOS VÁLIDOS-------")        
    console.log("Ingrese 1 para -> ingresar Pedido seguido de -> 'nombre del cliente  direccion  fechaSolicitud (año - mes- dia)  tipoServicio  descripcion  tecnicoAsignado (Camila Rodríguez - Diego Herrera - Hugo López)  fechaProgramada (año - mes- dia)  estado (pendiente - completado - en proceso)  observaciones")
    console.log("Ingrese 2 para -> modificar Pedido  seguido de -> DNI del clinete")
    console.log("Ingrese 3 para -> eliminar Pedido   seguido de -> DNI del cliente")
    console.log("Ingrese 4 para -> ver Pedido xxxx-xx-xx seguido de -> fecha programada la visita (año-mes-dia) ")
    console.log("Ingrese 5 para -> ver Pedidos Finalizados -> ver todos los pedidos con estado 'COMPLETADO'")
    console.log("Ingrese 6 para -> ver Pedidos Pendientes  -> ver todos los pedidos con estado 'PENDIENTE'")
    console.log("Ingrese 7 para -> Buscar Pedidos seguido de  -> DNI del cliente")
    console.log("Ingrese 8 para -> Listar todos los Pedidos")

    break;
  case "1":
    console.log(argumentos[3])
    if (argumentos[3]) {
      console.log("------NUEVO PEDIDO------")
      console.log("Escriba 'nombre del cliente - DNI - direccion - tecnicoAsignado (Camila- Diego - Hugo) - fechaProgramada (año - mes- dia) - estado (pendiente - completado - en proceso) - ")
       
      const nombre = argumentos[3]
      const dni = Number(argumentos[4])      
      const direccionC = argumentos[5]
      const tecnicoAsignadoC = argumentos[6]
      const fechaVisita = argumentos[7]
      const estadoC = argumentos[8]
      
      
      const nuevoPedido : Pedido = {
        id : crypto.randomUUID(),
        cliente : nombre,
        dniCliente : dni,
        telefonoCliente:telefono,
        direccion : direccionC,
        fechaSolicitud : fechaS,
        tipoServicio : tipoS,
        tecnicoAsignado : tecnicoAsignadoC, 
        fechaProgramada : fechaVisita,
        estado : estadoC,
        
      }
      // console.log(argumentos[4])
      const pedidoBuscado = buscarPedido(argumentos[4])
      // console.log(pedidoBuscado,"----------------Pedido buscado fucnion")
      if (!pedidoBuscado &&
          !nombre ||
          !dni ||          
          !direccionC ||          
          !tecnicoAsignadoC ||
          !fechaVisita ||
          !estadoC
        ){
        pedidosServicio.push(nuevoPedido)
      } else { 
        console.log("El usuario ya esta en la base de datos",pedidoBuscado)
      }

    } else {
      console.log("Ingrese los datos correspondientes ")
    }
    break;
  case "2":
    console.log("------MODIFICAR PEDIDO------")
    break;
  case "3":
    console.log("------ELIMINAR PEDIDO------")

    const DNI = argumentos[3]
    if (!DNI) {
      console.log("Ingrese el DNI del cliente seguido de la opcion 3")
    } else {

      const indice = pedidosServicio.findIndex((pedido) => pedido.dniCliente === Number(DNI))

      if (indice === -1) {
        console.log("El pedido no existe")
      } else {
        console.log("---PEDIDO BORRADO---")
        const pedidoBorrado = pedidosServicio.splice(indice, 1)
        console.log(pedidoBorrado)
      }
      
    }  
    break;
  case "4":
    console.log("------VER VISITAS DEL PEDIDO A LA FECHA ", argumentos[7],"------")

    if (!argumentos[3]) {
      console.log("Ingrese 'verPedido xxxx-xx-xx (año-mes-dia)', para poder visualizar el pedido a esa fecha")
    } else {
      const pedidoEncontrado = pedidosServicio.find((pedido) => pedido.fechaProgramada === argumentos[7])

      console.log(pedidoEncontrado)

    }
    break;
    
  case "5":
    console.log("------PEDIDOS FINALIZADOS------")
        
    let pedidosFinalizados: Pedido[] = []

    pedidosServicio.forEach((pedido) => {
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

    let pedidosPendientes: Pedido[] = []

    pedidosServicio.forEach((pedido) => {
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
      
      const pedido = buscarPedido((argumentos[3]))
    //   const clienteEspecifico = pedidosServicio.find((cliente) => cliente.dniCliente === Number(argumentos[3]))
      console.log(pedido)
    }
    break;
  case "8":
    console.log(pedidosServicio)
    break;
  default: console.log("Comando invalido, ingrese info para ver todos los comandos")
}