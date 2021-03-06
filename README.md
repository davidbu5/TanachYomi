Api for calculating the tanach-yomi seder according to the mesora separation.

For more info: https://www.tanachyomi.co.il/

Info rights and calculation method rights belongs to the site's owner.

-----------------------------------------------------------------------------------------------------------------------------------

The API is live in address: https://tanachyomiapi.herokuapp.com/

(For example: https://tanachyomiapi.herokuapp.com/year/5780/excel/1)

# API:

## localhost/year/:yearNum:

Will return JSON array representing the learning year days attached by the corresponding seders for every day.

For example: localhost/year/5780

## localhost/year/:yearNum:/excel/:excelType:

Will return an Excel file (xlsx formatted) that includes  the learning calendar.

There are 3 options for generating Excel calendars:
1. Not mesora separation
2. Mesora separation - large
3. Mesora separation - small

See examples of the Excel types in the tests folders.

For example: 
localhost/year/5780/excel/2 - Returns excel calendar with mesora separation represented seders, including Shabbat days.

