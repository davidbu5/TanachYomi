import { getTanachLearningYear } from '../src/modules/tanachLearningYear';
import { createNotMesoraExcelFromWeeks } from '../src/modules/excelFactories/notMesoraExcelFactory';
import { createMesoraExcelFromWeeks } from '../src/modules/excelFactories/mesoraExcelFactory';
import { createMesoraSmallExcelFromWeeks } from '../src/modules/excelFactories/mesoraSmallExcelFactory';

const years = [5780, 5782];

years.forEach(yearNum => {
    const year = getTanachLearningYear(yearNum);
    createNotMesoraExcelFromWeeks(year, yearNum)
    createMesoraExcelFromWeeks(year, yearNum)
    createMesoraSmallExcelFromWeeks(year, yearNum)
})