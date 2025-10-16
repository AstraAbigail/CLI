
import { pedidosServicio} from "./pedidos"

const buscarPedido = (argumentos: String): any | undefined => { 
  console.log(argumentos,"--------argumentos")

  const clienteEspecifico = pedidosServicio.find((pedido) => pedido.dniCliente === Number(argumentos));
  console.log(clienteEspecifico,"cliente especifico")
  return clienteEspecifico;

};



export { buscarPedido}