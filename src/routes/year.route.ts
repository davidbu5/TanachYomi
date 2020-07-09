import * as express from 'express';
import { getTanachLearningYear } from '../modules/tanachLearningYear';

const yearRouter = express.Router();

yearRouter.get('/:yearNum', (req, res) => {
    const yearNum = parseInt(req.params['yearNum'] as string);
    if (!yearNum || isNaN(yearNum)) {
        res.status(401);
        return res.send("Year number should be a valid number")
    }
    const year = getTanachLearningYear(yearNum)
    res.status(200);
    return res.json(year);
});

export { yearRouter };
