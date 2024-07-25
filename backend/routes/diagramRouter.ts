import { Router } from 'express';

import diagramController from '../controllers/diagramController';

const router = Router();

router.get('/', diagramController.getAll);
router.get('/:id', diagramController.getById);
router.post('/', diagramController.create);

export default router;
