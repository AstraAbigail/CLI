
// import { pedidosServicio} from "./pedidos"

interface Pedido { 
  cliente: string;
  dniCliente: number,  
  direccion: string;  
  tecnicoAsignado: string;
  fechaProgramada: string;
  estado: string;
}

const buscarPedido = (argumentos: String, pedidos:any []): Pedido | undefined => { 
  // console.log(argumentos,"--------argumentos")

  const clienteEspecifico = pedidos.find((pedido) => pedido.dniCliente === Number(argumentos));
  // console.log(clienteEspecifico,"cliente especifico")
  return clienteEspecifico;

};



export { buscarPedido}