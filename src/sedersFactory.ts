import { Seder } from "./models/seder";
import { getRawSeders } from "./rawSedersRepo"

const normalYearSeders = 293;

export function getSedersByLearningDaysCount(count: number): Seder[] {
    let notMeuberetExtraSedersCount = count - normalYearSeders;
    let isMeuberet = count > 300;
    if (isMeuberet) {
        notMeuberetExtraSedersCount -= 25;
    }
    let notMeuberetExtraSedersCountLeftToAdd = notMeuberetExtraSedersCount;
    const seders = [];
    const rawSeders = getRawSeders();
    for (const rawSeder of rawSeders) {

        if (rawSeder.splittingOptions &&
            notMeuberetExtraSedersCountLeftToAdd > 0) {

            rawSeder.splittingOptions.forEach(function (splittedRaw) {
                seders.push(Seder.fromRawSeder(splittedRaw))
            })
            notMeuberetExtraSedersCountLeftToAdd--;
        } else {
            seders.push(Seder.fromRawSeder(rawSeder))
        }
    }

    if (isMeuberet) {
        seders.push(...rawSeders.slice(-25).map(Seder.fromRawSeder))
    }

    return seders;
}