import { getSimchasTorahYearByWeeks } from './simchasTorahYear';
import { getSedersByLearningDaysCount } from './sedersFactory';
import { Day } from '../models/day';

const noLearnHolidays = [
    'פורים',
    "פסח",
    "שביעי של פסח",
    'יום העצמאות',
    'שבועות',
    'תשעה באב',
    "ראש השנה",
    "ראש השנה",
    'יום כיפור',
    "סוכות",
    'שמיני עצרת'
]

export function getTanachLearningYear(yearNum: number) {

    const year = getSimchasTorahYearByWeeks(yearNum);

    const learningDays = year.flat().filter(isTanachLearningDay);
    const learningDaysCount = learningDays.length;
    
    const seders = getSedersByLearningDaysCount(learningDaysCount);
    learningDays.forEach(day => {
        day.seder = seders.shift()
    })
    
    return year;
}


function isTanachLearningDay(day: Day) {
    if (!day) {
        return;
    }
    if (day.parashatShavua) {
        return;
    }
    if (day.holidayName &&
        noLearnHolidays.indexOf(day.holidayName) > -1) {
        return;
    }
    return true;
}