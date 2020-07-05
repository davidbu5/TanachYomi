import { RawSeder } from "./models/rawSeder";
import { Seder } from "./models/seder";

export function getRawSeders(): RawSeder[] {
    const example = new RawSeder('a', 'b', 'c', 'd');
    const example2 = new RawSeder('asd', 'b', 'c', 'd');
    const rawSeders: RawSeder[] = Array(293).fill(1).map(a => Object.assign({}, example));
    rawSeders[289].splittingOptions = [example2, example2]
    rawSeders[291].splittingOptions = [example2, example2]
    rawSeders[292].splittingOptions = [example2, example2]
    return rawSeders;
}