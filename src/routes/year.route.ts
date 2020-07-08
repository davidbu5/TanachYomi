import * as express from 'express';

const yearRouter = express.Router();

yearRouter.get('/', (req, res) => {
    res.status(200);
    res.send(true);
});

export { yearRouter };
