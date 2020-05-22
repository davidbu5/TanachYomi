var Hebcal = require('hebcal');
Hebcal.defaultCity = 'Jerusalem';

exports.getYearByWeeks = function (yearNum) {
    const year = getYear(5779);
    const holidays = getHolidaysForYear(year).sort(holidaysSort);
    setHolidaysOnYear(year, holidays);
    const weeks = getYearByWeeksAndWeekdays(year);
    return weeks;
}

function setHolidaysOnYear(year, holidays) {
    var index = 0;
    const days = year.days();
    for (var holiday of holidays) {

        var day = days[index];
        while (!day ||
            day.getMonth() !== holiday.date.getMonth() ||
            day.getDate() !== holiday.date.getDate()) {

            index++;
            day = days[index];
        }
        day.holiday = holiday;
    }
}

function holidaysSort(a, b) {
    var aMonth = a.date.getMonth();
    var bMonth = b.date.getMonth();
    if (aMonth > bMonth) return 1
    else if (aMonth < bMonth) return -1
    else
        if (a.date.getDate() > b.date.getDate()) return 1
        else if (a.date.getDate() < b.date.getDate()) return -1
        else return 0;
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
    const untilNisan = yearDays.splice(firstRoshHashanaIndex)
    yearDays = untilNisan.concat(yearDays);

    // filling the weeks array
    var currWeek = Array(7);
    for (var i = 0; i < daysInYearNum; i++) {
        const currDay = yearDays[i];
        if (i === 5) {
            const list = []
            for (var key in currDay) { list.push(key) }
            // console.log(list.sort());
        }

        currWeek[currDay.getDay()] = [currDay.getMonthName('h'), currDay.getDate('h'), `${currDay.greg().getDate()}/${currDay.greg().getMonth()+1}`];
        // if curr day is a holiday
        if (currDay.holiday) {
            currWeek[currDay.getDay()][3] = currDay.holiday.getDesc('h');
        }
        // if curr day is Shabbos
        if (currDay.getDay() === 6) {
            currWeek[currDay.getDay()][4] = currDay.getParsha('h')[0]
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