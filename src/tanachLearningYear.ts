import { getSimchasTorahYearByWeeks } from './simchasTorahYear';
import { getSedersByLearningDaysCount } from './sedersFactory';
import { Day } from './models/day';

const noLearnHolidays = [
    'פורים',
    "פסח יום א'",
    "פסח יום ז'",
    'יום העצמאות',
    'שבועות',
    'תשעה באב',
    "ראש השנה א'",
    "ראש השנה ב'",
    'יום כיפור',
    "סוכות יום א'",
    'שמיני עצרת / שמחת תורה'
]

export function getTanachLearningYear(yearNum: number) {

    const year = getSimchasTorahYearByWeeks(yearNum);

    const learningDays = year.flat().filter(isTanachLearningDay);
    const learningDaysCount = learningDays.length;
    const seders = getSedersByLearningDaysCount(learningDaysCount);
    learningDays.forEach(day => day.seder = seders.shift())
    
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