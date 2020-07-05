import {getSimchasTorahYearByWeeks} from './simchasTorahYear';
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

const year = getSimchasTorahYearByWeeks(5782);

console.log(year.flat().filter(isTanachLearningDay).length);

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