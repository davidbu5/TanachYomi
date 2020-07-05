import { RawSeder } from "./rawSeder";

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
        return new Seder(
            rawSeder.bookName,
            rawSeder.sederInBook,
            rawSeder.perek,
            rawSeder.pasuk
        )
    }
}