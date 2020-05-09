var Hebcal = require('hebcal');
Hebcal.defaultCity = 'Jerusalem';

const year = getYear(5780);
// console.log(getHolidaysForYear(year));
//getWeeksNumberFromYear(year)
getYearMatrix(year);

function getYear(yearNum) {
    var year = new Hebcal(yearNum);
    // console.log(year.getDay(178))
    return year;
}

function findIndexOfDate(year, date) {
    const yearDays = year.days()
    const daysInYearNum = yearDays.length;
    for (var i = 0; i < daysInYearNum; i++) {
        const currDay = yearDays[i];
        // console.log(currDay);
        
        if (currDay.getMonth() === date.getMonth() &&
            currDay.getDay() === date.getDay()) {
                // console.log(currDay);
                // console.log(date);
                
            return i;
        }
    }
}

function getYearMatrix(year) {
    const weeksArray = [];
    var yearDays = year.days()
    const daysInYearNum = yearDays.length;
    var roshDays = year.find();
    const firstRoshHashanaDate = year.find("rosh_hashana").filter(d => d.day == 1)[0]
    const firstRoshHashanaIndex = findIndexOfDate(year, firstRoshHashanaDate);
    console.log(firstRoshHashanaIndex);
    
    const untilNisan = yearDays.slice(firstRoshHashanaIndex)
    yearDays = untilNisan.concat(yearDays);
    
    var currWeek = Array(7);
    for (var i = 0; i < daysInYearNum; i++) {
        const currDay = yearDays[i];
        currWeek[currDay.getDay()] = [currDay.getMonthName(), currDay.getDate()];
        //console.log(currDay);
        if (currDay.getDay() === 6) {
            weeksArray.push(currWeek);
            currWeek = Array(7);
        }
    }
    weeksArray.push(currWeek);
    currWeek = null;
    console.log(weeksArray);
    

    // var roshDays = year.find("rosh_hashana");
    // console.log(roshDays.filter(d => d.day == 1)[0].getDay())
    // var weeks = year.length / 7;
}

function getHolidaysForYear(year) {
    var holidaysConcat = Object.values(year.holidays)
        .flat(Infinity);
    //.flat(Infinity);
    //const excludedHolidays = ["ערב שבת", "ראש חודש"]
    //console.log(holidaysConcat.map(ec => ec[0].getDesc('h')).filter(d => holidaysConcat.indexOf());

    return holidaysConcat;
}

