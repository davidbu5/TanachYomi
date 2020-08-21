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

export function createNotMesoraExcelFromWeeks(weeks: Day[][], yearNum?: number, objectToWriteOn?: any) {

    var wb = new xl.Workbook({
        defaultFont: {
            size: 8,
            name: 'David'
        }
    });

    var sheet = wb.addWorksheet('Calendar', {
        sheetView: {
            rightToLeft: true
        },
        pageSetup: {
            paperSize: 'A4_PAPER'
        },
        sheetFormat: {
            defaultColWidth: 9.5,
        },
        printOptions: {
            printHeadings: false
        },
        headerFooter: {
            alignWithMargins: true,
            scaleWithDoc: true
        },
        margins: {
            header: 0.001,
            footer: 0.001,
            top: 0.45,
            bottom: 0.3,
            right: 0.8,
            left: 0.8
        }
    });

    addSiteHeaderToSheet(wb, sheet)
    addWeekdaysHeaderToSheet(wb, 2, sheet)
    weeks.forEach((week, index) => addWeekToSheet(wb, sheet, index, week))

    wb.write(`${yearNum ? yearNum + " " : ""}RegularPrakim.xlsx`, objectToWriteOn)
}

function addSiteHeaderToSheet(wb, sheet) {

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
        '‏לוח תנ"ך יומי תש"פ',
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
        'לימוד כל התנ"ך בשנה אחת - ע"פ חלוקת ה"סדרים" של המסורה',
        "\n",
        {
            name: "Arial",
            size: 8
        },
        "לפרטים נוספים: www.tanachyomi.co.il"
    ]

    sheet.cell(1, 1, 1, 7 * 2, true)
        .string(header)
        .style(centerWrappedTextAlign);

    sheet.row(1).setHeight(29.40)
}

function addWeekdaysHeaderToSheet(wb, row: number, sheet) {
    const largerFont = wb.createStyle({ font: { size: 12 } })

    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
    days.forEach((day, index) => {
        sheet.cell(row, index * 2 + 1, row, index * 2 + 2, true).string(day).style(getBorderStyle(wb, true, true, true, true)).style(largerFont)
    })
    sheet.row(row).setHeight(13)
}

function addWeekToSheet(wb, sheet, weekIndex: number, week: Day[]) {
    let startIndexFromTop = weekIndex * 3 + 3;

    if (weekIndex === 26) {
        addWeekdaysHeaderToSheet(wb, startIndexFromTop + 6, sheet)
    }
    if (weekIndex > 26) {
        startIndexFromTop += 4
    }
    sheet.row(startIndexFromTop).setHeight(8)
    sheet.row(startIndexFromTop + 1).setHeight(8.5)
    // if (week.every(d => !d||!d.holidayName)) {
    //     sheet.row(startIndexFromTop + 1).setHeight(7.5)
    // }
    sheet.row(startIndexFromTop + 2).setHeight(11)

    week.forEach((day, dayIndex) => {

        addDayToSheet(wb, sheet, weekIndex, dayIndex, day);

    })
}

function addDayToSheet(wb, sheet, weekIndex: number, dayIndex: number, day: Day) {

    const smallBoldFont = wb.createStyle({ font: { bold: true } })
    const largeFont = wb.createStyle({ font: { size: 11 } })
    const centerTextAlign = wb.createStyle({ alignment: { horizontal: 'center' } })
    const rightTextAlign = wb.createStyle({ alignment: { horizontal: 'right' } })

    const startIndexFromLeft = dayIndex * 2 + 1;
    let startIndexFromTop = weekIndex * 3 + 3;

    if (weekIndex > 26) {
        startIndexFromTop += 4
    }

    sheet.cell(startIndexFromTop, startIndexFromLeft).string("").style(getBorderStyle(wb, false, true, true))
    sheet.cell(startIndexFromTop, startIndexFromLeft + 1).string("").style(getBorderStyle(wb, true, false, true))

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