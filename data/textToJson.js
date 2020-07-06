var fs = require('fs')
var text = fs.readFileSync('./raw.txt', 'utf8');

class BookRawSeders {
    static fromBlock(text) {
        const lines = text.split("\n");
        const bookName = lines.shift();
        let rawSeders = lines.map(line => RawSeder.fromLine(bookName, line));
        const splitted = rawSeders.filter(s => s.sederInBook.indexOf("1") >= 0 ||
                                               s.sederInBook.indexOf("2") >= 0)

        if (splitted.length) {
            rawSeders = rawSeders.filter(s => s.sederInBook.indexOf("1") < 0 &&
                                              s.sederInBook.indexOf("2") < 0)

            const splittedSederName = splitted[0].sederInBook.slice(0, -1);
            const splittedSeder = rawSeders.find(s => s.sederInBook === splittedSederName);
            splittedSeder.splittingOptions = splitted;
        }

        return rawSeders;
    }
}

class RawSeder {
    bookName;
    sederInBook;
    perek;
    pasuk;
    innerBookName;

    static fromLine(mainBookName, text) {
        const rawSeder = new RawSeder();
        rawSeder.bookName = mainBookName;
        const info = text.split(" ")
        if (info.length === 3) {
            rawSeder.sederInBook = info[0];
            rawSeder.perek = info[1];
            rawSeder.pasuk = info[2];
            delete rawSeder.innerBookName;
        } else {
            rawSeder.sederInBook = info[0];
            rawSeder.innerBookName = info[1];
            rawSeder.perek = info[2];
            rawSeder.pasuk = info[3];
        }
        return rawSeder;
    }
}

var blocks = text.split("\n\n");

var rawSeders = blocks.map(b => BookRawSeders.fromBlock(b)).flat();

fs.writeFileSync('./rawSeders.json', JSON.stringify(rawSeders, null, 4))
