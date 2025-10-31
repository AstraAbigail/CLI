import { Router} from "express"
import authMiddleware from "../middleware/authMiddleware"
import PedidosControlers from "../controllers/pedidosControllers"


const pedidoRouter = Router()


// //Estado de la conexion
// pedidoRouter.get("/", (__: Request, res: Response) => {
//   res.json({status:true})
// })


//Mostrar todos los pedidos
pedidoRouter.get("/", authMiddleware, PedidosControlers.getAllPedidos)

//Buscar Pedido por ID
pedidoRouter.get("/:id",authMiddleware, PedidosControlers.getPedidoByID)

//agregar pedido
pedidoRouter.post("/",authMiddleware, PedidosControlers.addPedido)

//MODIFICAR PEDIDO
pedidoRouter.patch("/:id", authMiddleware, PedidosControlers.patchPedido)

//eliminar pedido
pedidoRouter.delete("/:id", authMiddleware, PedidosControlers.deletePedido)


export default pedidoRouter