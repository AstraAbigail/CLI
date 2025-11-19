import { Router} from "express"
// import authMiddleware from "../middleware/authMiddleware"
import PedidosControlers from "../controllers/pedidosControllers"


const pedidoRouter = Router()


// //Estado de la conexion
// pedidoRouter.get("/", (__: Request, res: Response) => {
//   res.json({status:true})
// })

//se desactivo addmiderware 
//Mostrar todos los pedidos
pedidoRouter.get("/", PedidosControlers.getAllPedidos)

//Buscar Pedido por ID
pedidoRouter.get("/:id", PedidosControlers.getPedidoByID)

//agregar pedido
pedidoRouter.post("/", PedidosControlers.addPedido)

//MODIFICAR PEDIDO
pedidoRouter.patch("/:id",  PedidosControlers.updatePedido)

//eliminar pedido
pedidoRouter.delete("/:id",  PedidosControlers.deletePedido)


export default pedidoRouter