const Router = require('express');
const diagramRouter = require('./diagramRouter');
const userRouter = require('./userRouter');

const router = new Router();

router.use('/diagram', diagramRouter);
router.use('/user', userRouter);

module.exports = router;
