var Hebcal = require('hebcal');
Hebcal.LANGUAGE

var year = new Hebcal(5780);
year.setCity('Jerusalem');
var holidaysConcat = [].concat(Object.values(year.holidays))
console.log(holidaysConcat.map(ec=>ec[0].getDesc('h')));
//console.log(holidaysConcat);

