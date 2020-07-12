import { Day } from "../../models/day";
var xl = require('excel4node');

const basicBorderStyle = {
    style: 'thin',
    color: 'black'
};
function getBorderStyle(wb, right?, left?, top?, bottom?) {
    const settings = {};
    if (top) settings['top'] = basicBorderStyle;
    if (bottom) settings['bottom'] = basicBorderStyle;
    if (right) settings['right'] = basicBorderStyle;
    if (left) settings['left'] = basicBorderStyle;
    return wb.createStyle({ border: settings })
}

export function createNotMesoraExcelFromWeeks(weeks: Day[][], objectToWriteOn?: any) {

    var wb = new xl.Workbook({
        defaultFont: {
            size: 8,
            name: 'David'
        }
    });

    var sheet = wb.addWorksheet('Calendar', {
        sheetView: {
            rightToLeft: true
        }
    });

    addHeadToSheet(wb, sheet)
    weeks.forEach((week, index) => addWeekToSheet(wb, sheet, index, week))

    wb.write("notMesora.xlsx", objectToWriteOn)
}

function addHeadToSheet(wb, sheet) {
    const largerFont = wb.createStyle({ font: { size: 12 } })

    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
    days.forEach((day, index) => {
        sheet.cell(1, index * 2 + 1, 1, index * 2 + 2, true).string(day).style(getBorderStyle(wb, true, true, true, true)).style(largerFont)
    })
}

function addWeekToSheet(wb, sheet, weekIndex: number, week: Day[]) {
    week.forEach((day, dayIndex) => addDayToSheet(wb, sheet, weekIndex, dayIndex, day))
}

function addDayToSheet(wb, sheet, weekIndex: number, dayIndex: number, day: Day) {

    const smallBoldFont = wb.createStyle({ font: { bold: true } })
    const largeFont = wb.createStyle({ font: { size: 11 } })
    const centerTextAlign = wb.createStyle({ alignment: { horizontal: 'center' } })
    const rightTextAlign = wb.createStyle({ alignment: { horizontal: 'right' } })
    
    const startIndexFromLeft = dayIndex * 2 + 1;
    const startIndexFromTop = weekIndex * 3 + 2;

    sheet.cell(startIndexFromTop, startIndexFromLeft).string("").style(getBorderStyle(wb, false, true))
    sheet.cell(startIndexFromTop, startIndexFromLeft + 1).string("").style(getBorderStyle(wb, true))

    sheet.cell(startIndexFromTop + 2, startIndexFromLeft,
        startIndexFromTop + 2, startIndexFromLeft + 1, true).string("").style(getBorderStyle(wb, true, true, false, true))

    sheet.cell(startIndexFromTop + 1, startIndexFromLeft,
        startIndexFromTop + 1, startIndexFromLeft + 1, true).string("").style(getBorderStyle(wb, true, true))


    if (day) {
        sheet.cell(startIndexFromTop, startIndexFromLeft).string(day.hebrewRepresentation)
        sheet.cell(startIndexFromTop, startIndexFromLeft + 1).string(day.gregRepresentation).style(rightTextAlign)

        if (day.holidayName) {
            sheet.cell(startIndexFromTop + 1, startIndexFromLeft,
                startIndexFromTop + 1, startIndexFromLeft + 1).string(day.holidayName).style(smallBoldFont).style(centerTextAlign)
        }

        if (day.seder && day.seder.toNotMesoraString) {
            sheet.cell(startIndexFromTop + 2, startIndexFromLeft,
                startIndexFromTop + 2, startIndexFromLeft + 1).string(day.seder.toNotMesoraString()).style(largeFont)
        }
        if (day.parashatShavua &&
            day.parashatShavua !== day.holidayName &&
            day.parashatShavua.indexOf('חול המועד') === -1 &&
            day.parashatShavua.indexOf('סוכות') === -1) {
            sheet.cell(startIndexFromTop + 2, startIndexFromLeft,
                startIndexFromTop + 2, startIndexFromLeft + 1).string(day.parashatShavua).style(smallBoldFont)
        }
    }
}