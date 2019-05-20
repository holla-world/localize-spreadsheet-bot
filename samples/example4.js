//const Localize = require ("localize-spreadsheet-bot");
const Localize = require ("../index.js");
//const key = require ("./testcmr.json");
const key = require ("./credentials.json");
//2PACX-1vQiVoRHzzOtpW122bhKTfnASaV_bkK_4ZZo01VPs6OmFLuFE4TKQBFpqIiqv9DQOcIXZ5DNM-_r9fnd
const transformer = Localize.fromGoogleSpreadsheet ("1BKkw9LEaozSqe2way4xTUJyT3ayztXFvX4sxxNaQl8g", "Sheet1", () => {
    transformer.setKeyCol ("KEY");
    const path_start = "bbgc_app/";
    const path_st = "values/";
    //do jobs for react-native
    transformer.save (path_start + "language_zh.json", { valueCol : "CN", format : "json" });
    transformer.save (path_start + "language_tw.json", { valueCol : "ZH", format : "json" });
    transformer.save (path_start + "language_en.json", { valueCol : "EN", format : "json" });
    transformer.save (path_start + "language_in.json", { valueCol : "IN", format : "json" });
});
//transformer.saveFlowTypeFileJs(path_start+"app/lang/types.js");
//do jobs for android
console.log ("==== job complete ====");
//process.exit(1);
