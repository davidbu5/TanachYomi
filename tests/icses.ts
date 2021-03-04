import { getTanachLearningYear } from '../src/modules/tanachLearningYear';
import { createIcal } from '../src/modules/calendarIntegration/ical';
import * as fs from 'fs';

const startYear = 5781;

for (let i = 0; i < 10; i++) {
    const yearNum = startYear + i;
    const year = getTanachLearningYear(yearNum);
    const currIcal = createIcal(year, yearNum);
    fs.writeFileSync(`./icses/${yearNum}.ics`, currIcal, { encoding: 'utf-8' });
}