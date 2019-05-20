import GoogleSheetsData from 'google-sheets-data'

const sheetId = '2PACX-1vTyM-O3UXMaxhulWKWAN5QKx8zdJkTocxLrBTtgzLwNvW7jbez5-nhn3bGDQpU9eWUNkc_UA9pTtY1j';
const sheet = new GoogleSheetsData (sheetId);
const data = await sheet.getData ();
console.log (data);