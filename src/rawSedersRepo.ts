import { RawSeder } from "./models/rawSeder";
import { Seder } from "./models/seder";

export function getRawSeders(): RawSeder[] {
    const example = new RawSeder('a', 'b', 'c', 'd');
    const example2 = new RawSeder('asd', 'b', 'c', 'd');
    const rawSeders: RawSeder[] = Array(293).fill(1).map((a, index) => Object.assign({}, example, {index}));
    rawSeders[100].splittingOptions = [example2, example2]
    rawSeders[101].splittingOptions = [example2, example2]
    rawSeders[102].splittingOptions = [example2, example2]
    rawSeders[103].splittingOptions = [example2, example2]
    return rawSeders;
}