import { Router } from "express";
import { EventoController } from "../controllers/eventoController";

const router = Router();
const controller = new EventoController();

router.post('/eventos', controller.criar);
router.get('/eventos', controller.listar);
router.put('/eventos/:id', controller.atualizar);
router.delete('/eventos/:id', controller.excluir);

export default router;