var Hebcal = require('hebcal');
Hebcal.LANGUAGE
const ex = ["ערב שבת", "ראש חודש"]
var year = new Hebcal(5780);
year.setCity('Jerusalem');
var holidaysConcat = [].concat(Object.values(year.holidays))
console.log(holidaysConcat.map(ec=>ec[0].getDesc('h')).filter(d=>d.indexOf(ex[0]) === -1 &&
                                                                d.indexOf(ex[1]) === -1));
//console.log(holidaysConcat);

