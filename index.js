var Hebcal = require('hebcal');
Hebcal.defaultCity = 'Jerusalem';

const year = getYear(5780);
const weeks = getYearByWeeksAndWeekdays(year);
const holidays = getHolidaysForYear(year);

console.log(holidays.map(h=>h.getDesc('h')));
for (var holiday of holidays) {

}

function getYear(yearNum) {
    var year = new Hebcal(yearNum);
    return year;
}

function findIndexOfDate(year, date) {
    const yearDays = year.days();
    const daysInYearNum = yearDays.length;
    for (var i = 0; i < daysInYearNum; i++) {
        const currDay = yearDays[i];

        if (currDay.getMonth() === date.getMonth() &&
            currDay.getDay() === date.getDay()) {

            return i;
        }
    }
}

function getYearByWeeksAndWeekdays(year) {
    const weeksArray = [];
    var yearDays = year.days()
    const daysInYearNum = yearDays.length;

    // sort the year days starting by Tishrei and not by Nissan
    const firstRoshHashanaDate = year.find("rosh_hashana").filter(d => d.day == 1)[0]
    const firstRoshHashanaIndex = findIndexOfDate(year, firstRoshHashanaDate);
    const untilNisan = yearDays.slice(firstRoshHashanaIndex)
    yearDays = untilNisan.concat(yearDays);

    // filling the weeks array
    var currWeek = Array(7);
    for (var i = 0; i < daysInYearNum; i++) {
        const currDay = yearDays[i];
        currWeek[currDay.getDay()] = [currDay.getMonthName(), currDay.getDate()];

        // if curr day is Shabbos
        if (currDay.getDay() === 6) {
            currWeek[currDay.getDay()][2] = currDay.getParsha('h')[0]
            // add the week to the array and start new week
            weeksArray.push(currWeek);
            currWeek = Array(7);
        }
    }
    weeksArray.push(currWeek);
    currWeek = null;

    return weeksArray;
}

function getHolidaysForYear(year) {
    var holidaysConcat = Object.values(year.holidays)
        .flat(Infinity);

    const excluded = [
        "ערב יום כיפור",
        "ערב שבת",
        "יום השואה",
        "יום ירושלים",
        "פסח שני",
        "התחלת ספירת העומר"
    ];

    var filteredHolidays = holidaysConcat.filter(h => {
        const desc = h.getDesc('h');
        return h.CHUL_ONLY == false &&
            !desc.startsWith("שבת") &&
            !desc.startsWith("ראש חודש") &&
            !desc.startsWith("ערב") &&
            !desc.startsWith("ליל") &&
            excluded.indexOf(desc) === -1
    })

    return filteredHolidays;
}