import { RawSeder } from "../models/rawSeder";
import { Seder } from "../models/seder";
var rawSeders = require("../../data/rawSeders.json")

export function getRawSeders(): RawSeder[] {
    return rawSeders;
}