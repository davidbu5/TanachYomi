var fs = require('fs')
var text = fs.readFileSync('./raw.txt', 'utf8');

class BookRawSeders {
    static fromBlock(text, bookNum) {
        const lines = text.split("\n");
        const bookName = lines.shift();
        let rawSeders = lines.map((line, lineIndex) => RawSeder.fromLine(bookName, bookNum, line, lineIndex + 1));
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
    
    urlBookId;
    urlSederId;
    urls;

    static fromLine(bookName, bookNum, line, lineNum) {
        const rawSeder = new RawSeder();
        rawSeder.bookName = bookName;
        const info = line.split(" ")
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

        
        rawSeder.urlBookId = bookNum;
        rawSeder.urlSederId = lineNum;
        rawSeder.urls = RawSeder.getUrls(bookNum, lineNum);
        return rawSeder;
    }

    static getUrls(bookNum, lineNum) {
        const b = getNumberStr(bookNum);
        const l = getNumberStr(lineNum);
        return {
            plain: `https://www.tanachyomi.co.il/pagesTanach/b${b}_ch${l}.html`,
            teamim: `https://www.tanachyomi.co.il/pagesTanachTeamim/b${b}_ch${l}.html`,
            voice: `https://www.tanachyomi.co.il/pagesTanachVoice/b${b}_ch${l}.mp3`
        };
    }
}

function getNumberStr(number) {
    return number > 9 ? number.toString() : `0${number}`;
}

var blocks = text.split("\n\n");

var rawSeders = blocks.map((b, bookIndex) => BookRawSeders.fromBlock(b, bookIndex + 1)).flat();

fs.writeFileSync('./rawSeders.json', JSON.stringify(rawSeders, null, 4))
