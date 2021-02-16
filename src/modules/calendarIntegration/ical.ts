import { Day } from "../../models/day";
import * as ical from "ical-generator";
import * as moment from "moment";

export function createIcal(weeks: Day[][], yearNum?: number) {
    const cal = ical({name: `Tanach Yomi ${yearNum}`});
    weeks.forEach(w => {
        w.forEach(d => {
            if (d)
            cal.createEvent({
                start: moment(d.gregDate),
                allDay: true,
                summary: `${d.seder.bookName} ס' ${d.seder.sederInBook}`,
                description: `${d.seder.bookName} ס' ${d.seder.sederInBook}\n
                לקריאת הסדר: ${d.seder.urls.plain}\n
                לקריאת הסדר בטעמים: ${d.seder.urls.teamim}\n
                לשמיעת הסדר: ${d.seder.urls.voice}`,
                url: d.seder.urls.plain
            });

        })
    });

    return cal.toString();
}