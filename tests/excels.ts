import { getTanachLearningYear } from '../src/modules/tanachLearningYear';
import { createNotMesoraExcelFromWeeks } from '../src/modules/excelFactories/notMesoraExcelFactory';
import { createMesoraExcelFromWeeks } from '../src/modules/excelFactories/mesoraExcelFactory';
import { createMesoraSmallExcelFromWeeks } from '../src/modules/excelFactories/mesoraSmallExcelFactory';

const year = getTanachLearningYear(5782);
createNotMesoraExcelFromWeeks(year)
createMesoraExcelFromWeeks(year)
createMesoraSmallExcelFromWeeks(year)
