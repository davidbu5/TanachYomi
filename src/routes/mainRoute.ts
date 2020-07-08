import * as express from 'express';
import { yearRouter } from './year.route';

export function getMainRouter() {
    const mainRouter = express.Router();
    mainRouter.get('/year', yearRouter)
    return mainRouter;
}
