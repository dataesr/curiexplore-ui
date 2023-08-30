import express from 'express';

import opendatasoftRouter from './routes/opendatasoft';
import paysageRouter from './routes/paysage';

const router = new express.Router();

router.use(opendatasoftRouter);
router.use(paysageRouter);

export default router;
