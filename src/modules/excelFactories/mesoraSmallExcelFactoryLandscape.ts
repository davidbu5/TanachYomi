import { truncate } from "fs/promises";
import { Day } from "../../models/day";
var xl = require('excel4node');
var gematriya = require('gematriya');

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
export function createMesoraSmallExcelLandscapeFromWeeks(weeks: Day[][], yearNum?: number, objectToWriteOn?: any) {

    var wb = new xl.Workbook({
        defaultFont: {
            size: 8,
            name: 'David'
        }
    });

    var sheet = wb.addWorksheet('Calendar', {
        sheetView: {
            rightToLeft: false,
            showGridLines: true
        },
        pageSetup: {
            paperSize: 'A4_PAPER',
            orientation: 'landscape'
        },
        sheetFormat: {
            defaultColWidth: 11
        },
        'margins': {
            'top': 0.5,
            'bottom': 0.5,
            right: 0.7,
            left: 0.7
        }
    });

    sheet.column(7).setWidth(2);
    sheet.column(14).setWidth(2);
    
    addSiteHeaderToSheet(wb, sheet, yearNum)
    addHeadToSheet(wb, sheet)
    weeks.forEach((week, index) => addWeekToSheet(wb, sheet, index, week))

    wb.write(`${yearNum ? yearNum + " " : ""}RegularSmallLandscape.xlsx`, objectToWriteOn)
}

function addSiteHeaderToSheet(wb, sheet, yearNum: number) {

    const centerWrappedTextAlign = wb.createStyle({
        alignment: {
            horizontal: 'center',
            vertical: 'center',
            wrapText: true
        }
    })

    const header = [
        {
            name: "Guttman Adii",
            underline: true,
            size: 14
        },
        getCalendarName(yearNum),
        {
            name: "Guttman Adii",
            underline: false,
            size: 14
        },
        '  ',
        {
            underline: false,
            name: "Guttman Adii",
            bold: true,
            size: 11
        },
        'לימוד כל התנ"ך בשנה אחת - ע"פ חלוקת ה"סדרים" של המסורה'
    ]

    const secondHeader = [
        {
            name: "Arial",
            size: 8
        },
        'לפרטים נוספים: www.tanachyomi.co.il'
    ]

    sheet.cell(1, 1, 1, 20, true)
        .string(header)
        .style(centerWrappedTextAlign);

    sheet.cell(2, 1, 2, 20, true)
        .string(secondHeader)
        .style(centerWrappedTextAlign);

    sheet.row(1).setHeight(15.75);
    sheet.row(2).setHeight(9.75);
}

function getCalendarName(yearNum: number) {
    const withoutThousands = yearNum - (yearNum - (yearNum % 1000));
    const yearName = gematriya(withoutThousands);
    const title = `‏לוח תנ"ך יומי ${yearName}`;
    return title;
}


function addHeadToSheet(wb, sheet) {
    const largerFont = wb.createStyle({ font: { size: 9 }, alignment: { horizontal: 'right', vertAlign: 'center', vertical: 'center' } })
    sheet.row(3).setHeight(10.2);
    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי']
    days.forEach((day, index) => {
        sheet.cell(3, 6 - index).string(day).style(getBorderStyle(wb, true, true, true, true)).style(largerFont)
        sheet.cell(3, 6 * 2 + 1 - index).string(day).style(getBorderStyle(wb, true, true, true, true)).style(largerFont)
        sheet.cell(3, 6 * 3 + 2 - index).string(day).style(getBorderStyle(wb, true, true, true, true)).style(largerFont)
    })
}

function addWeekToSheet(wb, sheet, weekIndex: number, week: Day[]) {
    week.forEach((day, dayIndex) => addDayToSheet(wb, sheet, weekIndex, dayIndex, day))
}

function addDayToSheet(wb, sheet, weekIndex: number, dayIndex: number, day: Day) {

    const boldFont = wb.createStyle({ font: { bold: true } })
    const centerTextAlign = wb.createStyle({ alignment: { horizontal: 'center', vertAlign: 'center', vertical: 'center' } })
    const rightTextAlign = wb.createStyle({ alignment: { horizontal: 'right', vertAlign: 'center', vertical: 'center' } })
    
    if (dayIndex === 6) {
        return;
    }

    const weeksInColumn = 19;
    const columnNumber = Math.floor(weekIndex / weeksInColumn);
    const currIndex = 6 - dayIndex;
    const startIndexFromTop = (weekIndex % weeksInColumn) * 3 + 2 + 2;
    const startIndexFromLeft = currIndex + (2 - columnNumber) * 6 + (2 - columnNumber);
    sheet.row(startIndexFromTop).setHeight(10.2)
    sheet.row(startIndexFromTop + 1).setHeight(10.2)
    sheet.row(startIndexFromTop + 2).setHeight(10.2)

    sheet.cell(startIndexFromTop, startIndexFromLeft).string("").style(getBorderStyle(wb, true, true)).style(rightTextAlign)
    sheet.cell(startIndexFromTop + 1, startIndexFromLeft).string("").style(getBorderStyle(wb, true, true)).style(rightTextAlign)
    sheet.cell(startIndexFromTop + 2, startIndexFromLeft).string("").style(getBorderStyle(wb, true, true, false, true)).style(rightTextAlign)

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
                { size: 4 },
                " ",
                { bold: true, size: 8 },
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