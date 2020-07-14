import * as express from 'express';
import { getTanachLearningYear } from '../modules/tanachLearningYear';
import { createNotMesoraExcelFromWeeks } from '../modules/excelFactories/notMesoraExcelFactory';
import { createMesoraExcelFromWeeks } from '../modules/excelFactories/mesoraExcelFactory';
import { createMesoraSmallExcelFromWeeks } from '../modules/excelFactories/mesoraSmallExcelFactory';

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

yearRouter.get('/:yearNum/excel/:excelType', (req, res) => {
    const yearNumString = req.params['yearNum'] as string;
    if (!yearNumString || isNaN(+yearNumString)) {
        res.status(401);
        return res.send("Year number should be a valid number")
    }
    const yearNum = parseInt(yearNumString);
    if (yearNum > 5900 || yearNum < 5700) {
        res.status(401);
        return res.send("Year number should be a year close to 5780 year (5700-5900")
    }

    const excelTypeString = req.params['excelType'] as string;
    if (!excelTypeString || isNaN(+excelTypeString) ||
        parseInt(excelTypeString) < 1 || parseInt(excelTypeString) > 3) {
        res.status(401);
        return res.send(`ExcelType should be a valid number:
                         1: Not mesora separation
                         2: Mesora separation - large
                         3: Mesora separation - small`);
    }
    const excelType = parseInt(excelTypeString);
    const year = getTanachLearningYear(yearNum)
    res.status(200);
    switch (excelType) {
        case (1): return createNotMesoraExcelFromWeeks(year, yearNum, res);
        case (2): return createMesoraExcelFromWeeks(year, yearNum, res);
        case (3): return createMesoraSmallExcelFromWeeks(year, yearNum, res);
    }
});

export { yearRouter };
