import { getTanachLearningYear } from '../src/modules/tanachLearningYear';
import { createNotMesoraExcelFromWeeks } from '../src/modules/excelFactories/notMesoraExcelFactory';
import { createMesoraExcelFromWeeks } from '../src/modules/excelFactories/mesoraExcelFactory';
import { createMesoraSmallExcelFromWeeks } from '../src/modules/excelFactories/mesoraSmallExcelFactory';
import { createMesoraA4ExcelFromWeeks } from '../src/modules/excelFactories/mesoraA4ExcelFactory';
import { createNotMesoraA4ExcelFromWeeks } from '../src/modules/excelFactories/notMesoraA4ExcelFactory';
import { createMesoraSmallExcelPortraitFromWeeks } from '../src/modules/excelFactories/mesoraSmallExcelFactoryPortrait';
import { createMesoraSmallExcelLandscapeFromWeeks } from '../src/modules/excelFactories/mesoraSmallExcelFactoryLandscape';
var cp = require("child_process");

const years = [5782];

cp.exec("taskkill /F /IM excel.exe")

years.forEach(yearNum => {
    

    const year = getTanachLearningYear(yearNum);
    // createNotMesoraExcelFromWeeks(year, yearNum)
    // createMesoraExcelFromWeeks(year, yearNum)
    // createMesoraSmallExcelFromWeeks(year, yearNum);
    createMesoraA4ExcelFromWeeks(year, yearNum);
    createNotMesoraA4ExcelFromWeeks(year, yearNum);
    createMesoraSmallExcelPortraitFromWeeks(year, yearNum);
    createMesoraSmallExcelLandscapeFromWeeks(year, yearNum);
    console.log("Created")
})
cp.exec("start excel \"C:/Dev/Node/TanachYomi/tests/5782 Regular A4.xlsx\""); // notice this without a callback..
cp.exec("start excel \"C:/Dev/Node/TanachYomi/tests/5782 RegularPrakim A4.xlsx\""); // notice this without a callback..
cp.exec("start excel \"C:/Dev/Node/TanachYomi/tests/5782 RegularSmallPortrait.xlsx\""); // notice this without a callback..
cp.exec("start excel \"C:/Dev/Node/TanachYomi/tests/5782 RegularSmallLandscape.xlsx\""); // notice this without a callback..
// cp.exec(`powershell -command "start-process -filepath 'C:/Dev/Node/TanachYomi/tests/${years[0]} Regular A4.xlsx' -verb print"`);