import { Seder } from "../models/seder";
import { getRawSeders } from "./rawSedersRepo"

const normalYearSeders = 293;

export function getSedersByLearningDaysCount(count: number): Seder[] {
    let notMeuberetExtraSedersCount = count - normalYearSeders;
    let isMeuberet = count > 300;
    if (isMeuberet) {
        notMeuberetExtraSedersCount -= 25;
    }
    let notMeuberetExtraSedersCountLeftToAdd = notMeuberetExtraSedersCount;
    const seders: Seder[] = [];
    const rawSeders = getRawSeders().reverse();
    // running on the seders from the last seder to the first
    // like in LIFO method (you can search on google)
    for (const rawSeder of rawSeders) {

        if (rawSeder.splittingOptions &&
            notMeuberetExtraSedersCountLeftToAdd > 0) {

            // running on splitted seder in normal order (not reversed)
            rawSeder.splittingOptions.reverse().forEach(function (splittedRaw) {
                seders.unshift(Seder.fromRawSeder(splittedRaw))
            })
            notMeuberetExtraSedersCountLeftToAdd--;
        } else {
            // adding the current seder to the start
            seders.unshift(Seder.fromRawSeder(rawSeder))
        }
    }

    if (isMeuberet) {
        // adding the seders of Divrei Hayamim to the end
        // and reversing them again because adding to the end of the list
        seders.push(...rawSeders.slice(0, 25).map(Seder.fromRawSeder).reverse())
    }

    return seders;
}