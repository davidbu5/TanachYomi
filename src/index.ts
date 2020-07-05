import { getTanachLearningYear } from './tanachLearningYear';

const year = getTanachLearningYear(5780)

console.log(...(year as any[]).flat().map(a=>a&&a.seder?a.seder.index:""));
