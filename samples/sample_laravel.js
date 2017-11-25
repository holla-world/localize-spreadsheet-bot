/**
 * Created by hesk on 25/11/2017.
 */
var Gs2File = require("../index.js");

var transformer = Gs2File.fromGoogleSpreadsheet("1BDg2g7caNeOSZ5dmsA6BabaAWt95n0-vDF9NySX7z9U");//0Aq6WlQdq71FydEprelR1UTNfM21GR1JTTFh5aUlGd2c
transformer.setKeyCol('KEY');

transformer.save("laravel/en.php", { valueCol: "EN", format: "laravel" });
transformer.save("laravel/zh.php", { valueCol: "ZH", format: "laravel" });
