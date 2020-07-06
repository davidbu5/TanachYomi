import { getTanachLearningYear } from './tanachLearningYear';
import { createExcelFromWeeks } from './excelFactory';

const year = getTanachLearningYear(5780);
createExcelFromWeeks(year)
