const simchasTorahName = 'שמיני עצרת';
import { getYearByWeeks } from './hebrewYear';
import { Day } from './models/day';
export function getSimchasTorahYearByWeeks(yearNum: number) {
    const mainYear = getYearByWeeks(yearNum);
    const secondaryYear = getYearByWeeks(yearNum + 1);

    const lastWeek = mainYear[mainYear.length - 1];
    if (!lastWeek[6]) {
        const filteredLastWeek = lastWeek.filter(e => e);
        lastWeek.length = filteredLastWeek.length;

        const firstWeek = secondaryYear.shift(); // pop first week
        while (!firstWeek[0]) { firstWeek.shift() }

        lastWeek.push(...firstWeek); // assign next week to last week
    }

    let joinedYears = mainYear.concat(secondaryYear); // concat years
    let simchasTorahIndices = getHolidayWeekIndices(joinedYears, simchasTorahName);


    joinedYears.length = simchasTorahIndices[1] + 1;
    joinedYears = joinedYears.splice(simchasTorahIndices[0]);

    removeDaysBeforeSimchasTorahInclude(joinedYears[0]);
    removeDaysAfterSimchasTorah(joinedYears[joinedYears.length - 1]);

    if (joinedYears[0][6] === null) {
        joinedYears = joinedYears.splice(1);
    }

    return joinedYears;
}

function removeDaysBeforeSimchasTorahInclude(week: Day[]) {
    for (let i = 0; i < week.length; i++) {
        let day = week[i];
        week[i] = null;
        if (day.holidayName === simchasTorahName) {
            break;
        }
    }
}

function removeDaysAfterSimchasTorah(week: Day[]) {
    for (let i = week.length - 1; i >= 0; i--) {
        let day = week[i];
        if (day.holidayName === simchasTorahName) {
            break;
        }
        week[i] = null;
    }
}

function getHolidayWeekIndices(weeks: Day[][], holidayName) {
    const indices = [];
    weeks.forEach((week, index) => {
        if (week.some(day => day.holidayName === holidayName)) {
            indices.push(index);
        }
    })
    return indices;
}


