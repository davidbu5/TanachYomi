import { Day } from "../models/day";
var xl = require('excel4node');
var wb = new xl.Workbook({
    defaultFont: {
        size: 8,
        name: 'David'
    }
});
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
const boldFont = wb.createStyle({ font: { bold: true } })
const largerFont = wb.createStyle({ font: { size: 10 } })
const centerTextAlign = wb.createStyle({ alignment: { horizontal: 'center' } })
const rightTextAlign = wb.createStyle({ alignment: { horizontal: 'right', readingOrder: 'contextDependent', justifyLastLine: false } })

export function createMesoraSmallExcelFromWeeks(weeks: Day[][]) {

    var sheet = wb.addWorksheet('Calendar', {
        sheetView: {
            rightToLeft: true
        }
    });

    addHeadToSheet(sheet)
    weeks.forEach((week, index) => addWeekToSheet(sheet, index, week))

    wb.write("mesoraSmall.xlsx")
}

function addHeadToSheet(sheet) {
    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי']
    days.forEach((day, index) => {
        sheet.cell(1, index + 1).string(day).style(getBorderStyle(true, true, true, true)).style(largerFont)
    })
}

function addWeekToSheet(sheet, weekIndex: number, week: Day[]) {
    week.forEach((day, dayIndex) => addDayToSheet(sheet, weekIndex, dayIndex, day))
}

function addDayToSheet(sheet, weekIndex: number, dayIndex: number, day: Day) {

    if (dayIndex === 6) {
        return;
    }

    const startIndexFromLeft = dayIndex + 1;
    const startIndexFromTop = weekIndex * 3 + 2;

    sheet.cell(startIndexFromTop, startIndexFromLeft).string("").style(getBorderStyle(true, true))
    sheet.cell(startIndexFromTop + 1, startIndexFromLeft).string("").style(getBorderStyle(true, true)).style(rightTextAlign)
    sheet.cell(startIndexFromTop + 2, startIndexFromLeft).string("").style(getBorderStyle(true, true, false, true))

    if (day) {
        sheet.cell(startIndexFromTop, startIndexFromLeft).string(day.hebrewRepresentation)
        
        let middleText;
        if (!day.holidayName ||
            (day.holidayName && !day.seder)) {
            middleText = day.gregRepresentation;
        } else {
            middleText = [
                "‏",
                { bold: false },
                day.gregRepresentation,
                " ",
                { bold: true },
                getShorterHolidayName(day.holidayName),
            ]
        }
        sheet.cell(startIndexFromTop + 1, startIndexFromLeft).string(middleText)

        if (!day.holidayName && day.seder ||
            day.holidayName && day.seder) {
            sheet.cell(startIndexFromTop + 2, startIndexFromLeft).string([
                    {
                        size: 8
                    },
                    getShorterBookName(day.seder.bookName, day.seder.sederInBook),
                    {
                        size: 6
                    },
                    " ס' ",
                    {
                        size: 8
                    },
                    day.seder.sederInBook
                ])
        } else if (day.holidayName && !day.seder) {
            sheet.cell(startIndexFromTop + 2, startIndexFromLeft).string(getShorterHolidayName(day.holidayName)).style(centerTextAlign).style(boldFont)
        }
    }
}

function getShorterBookName(bookName: string, sederName: string) {
    if (bookName === "תרי עשר" && sederName.length > 1) {
        return 'תר"ע';
    }
    if (bookName.startsWith("עזרא")) return 'עו"נ';
    if (bookName.startsWith("דברי")) return 'דבה"י';
    return bookName;
}

function getShorterHolidayName(holidayName: string) {
    if (holidayName.startsWith("יום") &&
        !holidayName.endsWith("כיפור")) {
        return holidayName.split(" ")[1].slice(1)
    }
    if (holidayName.startsWith("רה")) {
        return "";
    }
    if (holidayName.startsWith("הושענא")) {
        return 'הוש"ר';
    }
    if (holidayName.endsWith("פסח")) {
        return "פסח";
    }
    if (holidayName.startsWith("צום")) {
        return "צום";
    }
    if (holidayName.startsWith("תענית")) {
        return "תענית";
    }
    if (holidayName.startsWith("שושן")) {
        return "שושן";
    }
    return holidayName;
}