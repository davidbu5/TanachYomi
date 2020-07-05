import { RawSeder } from "./rawSeder";
const index = 0;
export class Seder {
    constructor(
        public bookName: string,
        public sederInBook: string,
        public perek: string,
        public pasuk: string
    ) {

    }
    
    static fromRawSeder(rawSeder: RawSeder) {
        if (!rawSeder.splittingOptions) {
            return rawSeder;
        }
        const seder = new Seder(
            rawSeder.bookName,
            rawSeder.sederInBook,
            rawSeder.perek,
            rawSeder.pasuk
        )
        seder['index'] = rawSeder['index'];
        return seder;
    }
}