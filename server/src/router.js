import express from 'express';

import paysageRouter from './routes/paysage';

const router = new express.Router();

router.use(paysageRouter);

export default router;
