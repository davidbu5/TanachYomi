import { RawSeder } from "./rawSeder";
const index = 0;
export class Seder {
    constructor(
        public bookName: string,
        public sederInBook: string,
        public perek: string,
        public pasuk: string,
        public innerBookName?: string,
    ) {

    }

    toNotMesoraString() {
        let bookName = this.bookName;
        
        if (this.innerBookName) {
            if (this.innerBookName.length === 1) {
                bookName = this.bookName + this.innerBookName
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
            rawSeder.pasuk
        )
        
        return seder;
    }
}