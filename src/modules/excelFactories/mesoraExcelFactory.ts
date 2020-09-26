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
export function createMesoraExcelFromWeeks(weeks: Day[][], yearNum?: number, objectToWriteOn?: any) {

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
            rightToLeft: true
        },
        pageSetup: {
            paperSize: 'LETTER_PAPER'
        },
        sheetFormat: {
            defaultColWidth: 9.6
        }
    });
    addSiteHeaderToSheet(wb, sheet, yearNum)
    addWeekdaysHeaderToSheet(wb, sheet)
    weeks.forEach((week, index) => addWeekToSheet(wb, sheet, index, week))

    for (const i of [0, 1, 2, 3, 4, 5, 6]) {
        sheet.column(i * 2 + 1).setWidth(11.2);
        sheet.column(i * 2 + 2).setWidth(9.6);
    }
    sheet.column(14).setWidth(5);

    wb.write(`${yearNum ? yearNum + " " : ""}Regular.xlsx`, objectToWriteOn)
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
        font: {
            size: 11
        },
        alignment: {
            veritcal: 'center'
        }
    });

    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
    days.forEach((day, index) => {
        sheet.cell(3, index * 2 + 1, 3, index * 2 + 2, true).string(day).style(weekdayHeaderStyle).style(getBorderStyle(wb, true, true, true, true))
        sheet.cell(88, index * 2 + 1, 88, index * 2 + 2, true).string(day).style(weekdayHeaderStyle).style(getBorderStyle(wb, true, true, true, true))
    })

    sheet.row(3).setHeight(12.3)
    sheet.row(88).setHeight(12.3)
}

function addWeekToSheet(wb, sheet, weekIndex: number, week: Day[]) {
    let firstRowIndex = weekIndex * 3 + 4;
    if (firstRowIndex >= 88) {
        firstRowIndex++;
    }
    sheet.row(firstRowIndex).setHeight(9)
    sheet.row(firstRowIndex + 1).setHeight(8)
    sheet.row(firstRowIndex + 2).setHeight(11.5)
    week.forEach((day, dayIndex) => addDayToSheet(wb, sheet, weekIndex, dayIndex, day))
}

function addDayToSheet(wb, sheet, weekIndex: number, dayIndex: number, day: Day) {

    const smallBoldFont = wb.createStyle({ font: { bold: true } })
    const largeFont = wb.createStyle({ font: { size: 11 } })
    const centerTextAlign = wb.createStyle({ alignment: { horizontal: 'center', vertical: 'center' } })
    const rightTextAlign = wb.createStyle({ alignment: { horizontal: 'right', vertical: 'center' } })
    const leftTextAlign = wb.createStyle({ alignment: { horizontal: 'left', vertical: 'center' } })
    const centerVerticalAlign = wb.createStyle({ alignment: { vertAlign: 'center', vertical: 'center' } })

    const startIndexFromLeft = dayIndex * 2 + 1;
    let startIndexFromTop = weekIndex * 3 + 4;
    if (startIndexFromTop >= 88) {
        startIndexFromTop++;
    }

    sheet.cell(startIndexFromTop, startIndexFromLeft).string("").style(getBorderStyle(wb, false, true)).style(centerVerticalAlign)
    sheet.cell(startIndexFromTop, startIndexFromLeft + 1).string("").style(getBorderStyle(wb, true)).style(centerVerticalAlign)

    sheet.cell(startIndexFromTop + 2, startIndexFromLeft,
        startIndexFromTop + 2, startIndexFromLeft + 1, true).string("").style(getBorderStyle(wb, true, true, false, true)).style(centerVerticalAlign)

    sheet.cell(startIndexFromTop + 1, startIndexFromLeft,
        startIndexFromTop + 1, startIndexFromLeft + 1, true).string("").style(getBorderStyle(wb, true, true)).style(centerVerticalAlign)

    if (day) {
        sheet.cell(startIndexFromTop, startIndexFromLeft).string(day.hebrewRepresentation)
        sheet.cell(startIndexFromTop, startIndexFromLeft + 1).string(day.gregRepresentation).style(leftTextAlign).style(centerVerticalAlign)

        if (day.holidayName) {
            sheet.cell(startIndexFromTop + 1, startIndexFromLeft,
                startIndexFromTop + 1, startIndexFromLeft + 1).string(day.holidayName).style(smallBoldFont).style(centerTextAlign).style(centerVerticalAlign)
        }

        if (day.seder) {
            sheet.cell(startIndexFromTop + 2, startIndexFromLeft,
                startIndexFromTop + 2, startIndexFromLeft + 1).string([
                    {
                        size: 11
                    },
                    day.seder.bookName,
                    {
                        size: 9
                    },
                    " ס' ",
                    {
                        size: 11
                    },
                    day.seder.sederInBook
                ])
        }
        if (day.parashatShavua &&
            day.parashatShavua !== day.holidayName &&
            day.parashatShavua.indexOf('חול המועד') === -1 &&
            day.parashatShavua.indexOf('סוכות') === -1) {
            sheet.cell(startIndexFromTop + 2, startIndexFromLeft,
                startIndexFromTop + 2, startIndexFromLeft + 1).string(day.parashatShavua).style(smallBoldFont).style(centerVerticalAlign)
        }
    }
}