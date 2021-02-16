import { Day } from "../../models/day";
import * as ical from "ical-generator";
import * as moment from "moment";

export function createIcal(weeks: Day[][], yearNum?: number) {
    const cal = ical({name: `Tanach Yomi ${yearNum}`});
    weeks.forEach(w => {
        w.forEach(d => {
            if (d && d.seder)
            cal.createEvent({
                start: moment(d.gregDate),
                allDay: true,
                summary: `${d.seder.bookName} ס' ${d.seder.sederInBook}`,
                description: `${d.seder.bookName} ס' ${d.seder.sederInBook}\nלקריאת הסדר: ${d.seder.urls.plain}\nלקריאת הסדר בטעמים: ${d.seder.urls.teamim}\nלשמיעת הסדר: ${d.seder.urls.voice}`,
                url: d.seder.urls.plain
            });

        })
    });

    return cal.toString();
}