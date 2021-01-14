import * as express from 'express';
import { getTanachLearningYear } from '../modules/tanachLearningYear';
import { createNotMesoraExcelFromWeeks } from '../modules/excelFactories/notMesoraExcelFactory';
import { createMesoraExcelFromWeeks } from '../modules/excelFactories/mesoraExcelFactory';
import { createMesoraSmallExcelFromWeeks } from '../modules/excelFactories/mesoraSmallExcelFactory';
import { createNotMesoraA4ExcelFromWeeks } from '../modules/excelFactories/notMesoraA4ExcelFactory';
import { createMesoraA4ExcelFromWeeks } from '../modules/excelFactories/mesoraA4ExcelFactory';
import { createMesoraSmallExcelPortraitFromWeeks } from '../modules/excelFactories/mesoraSmallExcelFactoryPortrait';
import { createMesoraSmallExcelLandscapeFromWeeks } from '../modules/excelFactories/mesoraSmallExcelFactoryLandscape';

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
        parseInt(excelTypeString) < 1 || parseInt(excelTypeString) > 7) {
        res.status(401);
        return res.send(`ExcelType should be a valid number:
                         1: Not mesora separation
                         2: Mesora separation - large
                         3: Mesora separation - small
                        
                         The new formats:
                         4: A4 Not mesora separation
                         5: A4 Mesora separation - large
                         6: A4 Mesora separation - small portrait
                         7: A4 Mesora separation - small landscape`);
    }
    const excelType = parseInt(excelTypeString);
    const year = getTanachLearningYear(yearNum)
    res.status(200);
    switch (excelType) {
        case (1): return createNotMesoraExcelFromWeeks(year, yearNum, res);
        case (2): return createMesoraExcelFromWeeks(year, yearNum, res);
        case (3): return createMesoraSmallExcelFromWeeks(year, yearNum, res);
        case (4): return createNotMesoraA4ExcelFromWeeks(year, yearNum, res);
        case (5): return createMesoraA4ExcelFromWeeks(year, yearNum, res);
        case (6): return createMesoraSmallExcelPortraitFromWeeks(year, yearNum, res);
        case (7): return createMesoraSmallExcelLandscapeFromWeeks(year, yearNum, res);
    }
});

export { yearRouter };
