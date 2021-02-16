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
                summary: 'Example Event',
                description: 'It works ;)',
                location: 'my room',
                url: 'http://sebbo.net/'
            });

        })
    });

    return cal.toString();
}