const yearModule = require('./year');

const y5780 = yearModule.getYearByWeeks(5780);
const y5781 = yearModule.getYearByWeeks(5781);

const lastWeek = y5780[y5780.length - 1];
if (!lastWeek[6]) {
    const filteredLastWeek = lastWeek.filter(e=>e);
    lastWeek.length = filteredLastWeek.length;
    
    const firstWeek = y5781.shift(); // pop first week
    while(!firstWeek[0]) { firstWeek.shift() }

    lastWeek.push(...firstWeek); // assign next week to last week
}

let joinedYears = y5780.concat(y5781); // concat years
const simchasTorahIndices = getHolidayWeekIndices(joinedYears, 'שמיני עצרת / שמחת תורה');
console.log(simchasTorahIndices);

simchasTorahIndices.length = simchasTorahIndices[1];
joinedYears = joinedYears.splice(simchasTorahIndices[0]);
console.log(joinedYears);


function getHolidayWeekIndices(weeks, holidayName) {
    const indices = [];
    weeks.forEach((week, index) => {
        if (week.some(day=>day[3]===holidayName)) {
            indices.push(index);
        }
    })
    return indices;
}


