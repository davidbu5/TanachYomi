import { Seder } from "./seder";

export class Day {

    public seder: Seder;
    public holidayName?: string;
    public parashatShavua?: string;

    constructor(
        public hebrewRepresentation: string,
        public gregRepresentation: string,
    ) {

    }
}