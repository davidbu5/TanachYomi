import { Day } from "./models/day";
var xl = require('excel4node');
var wb = new xl.Workbook();
const basicBorderStyle = {
    style: 'thin',
    color: 'black'
};
function getBorderStyle(right?, left?, top?, bottom?) {
    const settings = {};
    if (top) settings['top'] = basicBorderStyle;
    if (bottom) settings['bottom'] = basicBorderStyle;
    if (right) settings['right'] = basicBorderStyle;
    if (left) settings['left'] = basicBorderStyle;
    return wb.createStyle({ border: settings })
}

export function createExcelFromWeeks(weeks: Day[][]) {

    var sheet = wb.addWorksheet('Calendar', {
        sheetView: {
            rightToLeft: true
        }
    });

    addHeadToSheet(sheet)
    weeks.forEach((week, index) => addWeekToSheet(sheet, index, week))

    wb.write("out.xlsx")
}

function addHeadToSheet(sheet) {
    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
    days.forEach((day, index) => {
        sheet.cell(1, index * 2 + 1, 1, index * 2 + 2, true).string(day).style(getBorderStyle(true, true, true, true))
    })
}

function addWeekToSheet(sheet, weekIndex: number, week: Day[]) {
    week.forEach((day, dayIndex) => addDayToSheet(sheet, weekIndex, dayIndex, day))
}

function addDayToSheet(sheet, weekIndex: number, dayIndex: number, day: Day) {

    const startIndexFromLeft = dayIndex * 2 + 1;
    const startIndexFromTop = weekIndex * 3 + 2;

    sheet.cell(startIndexFromTop, startIndexFromLeft).string("").style(getBorderStyle(false, true))
    sheet.cell(startIndexFromTop, startIndexFromLeft + 1).string("").style(getBorderStyle(true))

    sheet.cell(startIndexFromTop + 2, startIndexFromLeft,
        startIndexFromTop + 2, startIndexFromLeft + 1, true).string("").style(getBorderStyle(true, true, false, true))

    sheet.cell(startIndexFromTop + 1, startIndexFromLeft,
        startIndexFromTop + 1, startIndexFromLeft + 1, true).string("").style(getBorderStyle(true, true))


    if (day) {
        sheet.cell(startIndexFromTop, startIndexFromLeft).string(day.hebrewRepresentation)
        sheet.cell(startIndexFromTop, startIndexFromLeft + 1).string(day.gregRepresentation)

        if (day.holidayName) {
            sheet.cell(startIndexFromTop + 1, startIndexFromLeft,
                startIndexFromTop + 1, startIndexFromLeft + 1).string(day.holidayName)
        }

        if (day.seder && day.seder.toNotMesoraString) {
            sheet.cell(startIndexFromTop + 2, startIndexFromLeft,
                startIndexFromTop + 2, startIndexFromLeft + 1).string(day.seder.toNotMesoraString())
        }
        if (day.parashatShavua) {
            sheet.cell(startIndexFromTop + 2, startIndexFromLeft,
                startIndexFromTop + 2, startIndexFromLeft + 1).string(day.parashatShavua)
        }
    }
}