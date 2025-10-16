
import { pedidosServicio} from "./pedidos"

interface Pedido {
  id: `${string}-${string}-${string}-${string}-${string}`;
  cliente: string;
  dniCliente: number,  
  direccion: string;  
  tecnicoAsignado: string;
  fechaProgramada: string;
  estado: string;
}

const buscarPedido = (argumentos: String): Pedido | undefined => { 
  console.log(argumentos,"--------argumentos")

  const clienteEspecifico = pedidosServicio.find((pedido) => pedido.dniCliente === Number(argumentos));
  // console.log(clienteEspecifico,"cliente especifico")
  return clienteEspecifico;

};



export { buscarPedido}