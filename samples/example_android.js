var Gs2File = require("../index.js");

var transformer = Gs2File.fromGoogleSpreadsheet("1BDg2g7caNeOSZ5dmsA6BabaAWt95n0-vDF9NySX7z9U");
transformer.setKeyCol('KEY');

transformer.save("androidres/values/strings2.xml", {valueCol: "EN", format: "android"});
transformer.save("androidres/values-zh/strings2.xml", {valueCol: "ZH", format: "android"});
