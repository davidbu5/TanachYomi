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
export function createNotMesoraA4ExcelFromWeeks(weeks: Day[][], yearNum?: number, objectToWriteOn?: any) {

    var wb = new xl.Workbook({
        defaultFont: {
            size: 8,
            name: 'David'
        }
    });

    var sheet = wb.addWorksheet('Calendar', {
        'margins': {
            'top': 0.68
        },
        sheetView: {
            rightToLeft: false
        },
        pageSetup: {
            paperSize: 'A4_PAPER'
        },
        sheetFormat: {
            defaultColWidth: 9.6
        }
    });
    addSiteHeaderToSheet(wb, sheet, yearNum)
    addWeekdaysHeaderToSheet(wb, sheet)
    weeks.forEach((week, index) => addWeekToSheet(wb, sheet, index, week))

    for (const i of [0, 1, 2, 3, 4, 5, 6].reverse()) {
        sheet.column(i * 2 + 1).setWidth(10.2);
        sheet.column(i * 2 + 2).setWidth(8.4);
    }
    // sheet.column(13).setWidth(7);
    // sheet.column(14).setWidth(5.5);

    wb.write(`${yearNum ? yearNum + " " : ""}RegularPrakim A4.xlsx`, objectToWriteOn)
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

    sheet.cell(1, 1, 1, 7 * 2, true)
        .string(header)
        .style(centerWrappedTextAlign);

    sheet.cell(2, 1, 2, 7 * 2, true)
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

function addWeekdaysHeaderToSheet(wb, sheet) {
    const weekdayHeaderStyle = wb.createStyle({
        alignment: {
            vertical: 'bottom'
        },
        font: {
            size: 10
        }
    });

    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
    days.forEach((day, rawIndex) => {
        const index = 6 - rawIndex;
        sheet.cell(3, index * 2 + 1, 3, index * 2 + 2, true).string(day).style(getBorderStyle(wb, true, true, true, true)).style(weekdayHeaderStyle)
        sheet.cell(89, index * 2 + 1, 89, index * 2 + 2, true).string(day).style(getBorderStyle(wb, true, true, true, true)).style(weekdayHeaderStyle)
    })
    

    sheet.row(3).setHeight(14)
    sheet.row(89).setHeight(14)
}

function addWeekToSheet(wb, sheet, weekIndex: number, week: Day[]) {
    let firstRowIndex = weekIndex * 3 + 4;
    if (firstRowIndex >= 88) {
        firstRowIndex += 2;
    }
    
    sheet.row(firstRowIndex).setHeight(9.7)
    sheet.row(firstRowIndex + 1).setHeight(9)
    sheet.row(firstRowIndex + 2).setHeight(12)
    week.forEach((day, dayIndex) => addDayToSheet(wb, sheet, weekIndex, 6 - dayIndex, day))
}

function addDayToSheet(wb, sheet, weekIndex: number, dayIndex: number, day: Day) {

    const smallBoldFont = wb.createStyle({ font: { bold: true } })
    const largeFont = wb.createStyle({ font: { size: 9 } })
    const centerTextAlign = wb.createStyle({ alignment: { horizontal: 'center', vertAlign: 'center', vertical: 'center' } })
    const rightTextAlign = wb.createStyle({ alignment: { horizontal: 'right', vertAlign: 'top', vertical: 'top' } })
    const leftTextAlign = wb.createStyle({ alignment: { horizontal: 'left', vertAlign: 'top', vertical: 'top' } })

    const startIndexFromLeft = dayIndex * 2 + 1;
    let startIndexFromTop = weekIndex * 3 + 4;
    if (startIndexFromTop >= 88) {
        startIndexFromTop += 2;
    }


    sheet.cell(startIndexFromTop, startIndexFromLeft).string("").style(getBorderStyle(wb, false, true))
    sheet.cell(startIndexFromTop, startIndexFromLeft + 1).string("").style(getBorderStyle(wb, true))

    sheet.cell(startIndexFromTop + 2, startIndexFromLeft,
        startIndexFromTop + 2, startIndexFromLeft + 1, true).string("").style(getBorderStyle(wb, true, true, false, true))


    sheet.cell(startIndexFromTop + 1, startIndexFromLeft,
        startIndexFromTop + 1, startIndexFromLeft + 1, true).string("").style(getBorderStyle(wb, true, true))

    if (day) {
        sheet.cell(startIndexFromTop, startIndexFromLeft + 1).string(day.hebrewRepresentation).style(rightTextAlign)
        sheet.cell(startIndexFromTop, startIndexFromLeft).string(day.gregRepresentation).style(leftTextAlign)

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
                startIndexFromTop + 2, startIndexFromLeft + 1).string(day.parashatShavua).style(smallBoldFont).style(rightTextAlign)
        }
    }
}