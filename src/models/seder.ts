import { RawSeder } from "./rawSeder";
const index = 0;
export class Seder {
    constructor(
        public bookName: string,
        public sederInBook: string,
        public perek: string,
        public pasuk: string,
        public innerBookName?: string,

        public urlBookId?: number,
        public urlSederId?: number,
        public urls?: {
            "plain": string,
            "teamim": string,
            "voice": string
        }
    ) {

    }

    toNotMesoraString() {
        let bookName = this.bookName;

        if (this.innerBookName) {
            if (this.innerBookName.length === 1) {
                const bookShortName = this.bookName === "דברי הימים" ?
                    "דבהי" : this.bookName.slice(0, 3)
                bookName = bookShortName + "'" + this.innerBookName
            } else {
                bookName = this.innerBookName
            }
        }
        return `${bookName} ${this.perek} ${this.pasuk}`
    }

    static fromRawSeder(rawSeder: RawSeder) {

        const seder = new Seder(
            rawSeder.bookName,
            rawSeder.sederInBook,
            rawSeder.perek,
            rawSeder.pasuk,
            rawSeder.innerBookName,
            rawSeder.urlBookId,
            rawSeder.urlSederId,
            rawSeder.urls
        )

        return seder;
    }
}