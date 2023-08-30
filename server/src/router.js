import express from 'express';

import opendatasoftRouter from './routes/opendatasoft';
import paysageRouter from './routes/paysage';
import openalexRouter from './routes/openalex';

const router = new express.Router();

router.use(openalexRouter);
router.use(opendatasoftRouter);
router.use(paysageRouter);

export default router;
