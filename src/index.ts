import { getTanachLearningYear } from './tanachLearningYear';
import { createNotMesoraExcelFromWeeks } from './excelFactories/notMesoraExcelFactory';
import { createMesoraExcelFromWeeks } from './excelFactories/mesoraExcelFactory';
import { createMesoraSmallExcelFromWeeks } from './excelFactories/mesoraSmallExcelFactory';

const year = getTanachLearningYear(5780);
createNotMesoraExcelFromWeeks(year)
createMesoraExcelFromWeeks(year)
createMesoraSmallExcelFromWeeks(year)
