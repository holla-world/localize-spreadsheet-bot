//const Localize = require ("localize-spreadsheet-bot");
const Localize = require ("../index.js");
//const key = require ("./testcmr.json");
const key = require ("./credentials.json");


export default function (finish) {
    const transformer = Localize.fromGoogleSpreadsheet ("1BKkw9LEaozSqe2way4xTUJyT3ayztXFvX4sxxNaQl8g", "Sheet1", () => {
        transformer.setKeyCol ("KEY");
        const path_start = "bbgc_app/";
        const path_st = "values/";
//do jobs for react-native
        transformer.save (path_start + "language_zh.json", { valueCol : "CN", format : "json" });
        transformer.save (path_start + "language_tw.json", { valueCol : "ZH", format : "json" });
        transformer.save (path_start + "language_en.json", { valueCol : "EN", format : "json" });
        console.log ("==== job complete ====");
        finish()
    });
}
