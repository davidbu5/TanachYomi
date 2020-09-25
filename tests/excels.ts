import { getTanachLearningYear } from '../src/modules/tanachLearningYear';
import { createNotMesoraExcelFromWeeks } from '../src/modules/excelFactories/notMesoraExcelFactory';
import { createMesoraExcelFromWeeks } from '../src/modules/excelFactories/mesoraExcelFactory';
import { createMesoraSmallExcelFromWeeks } from '../src/modules/excelFactories/mesoraSmallExcelFactory';

const years = [5782];

years.forEach(yearNum => {
    var cp = require("child_process");

    cp.exec("taskkill /F /IM excel.exe")

    const year = getTanachLearningYear(yearNum);
    createNotMesoraExcelFromWeeks(year, yearNum)
    // createMesoraExcelFromWeeks(year, yearNum)
    //createMesoraSmallExcelFromWeeks(year, yearNum);

    cp.exec("start excel \"C:/Dev/Node/TanachYomi/tests/5782 RegularPrakim.xlsx\""); // notice this without a callback..
})