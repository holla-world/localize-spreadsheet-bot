var Localize = require("../index.js");

var transformer = Localize.fromGoogleSpreadsheet("0Aq6WlQdq71FydDZlaWdmMEUtc2tUb1k2cHRBS2hzd2c");
transformer.setKeyCol('KEY');

transformer.save("jsonsample/values/nl.json", { valueCol: "NL", format: "json", header: '' });
transformer.save("jsonsample/values/fr.json", { valueCol: "FR", format: "json" });
transformer.save("rn18/values/fr.json", { valueCol: "FR", format: "react-native-i18n" });
transformer.save("dart/values/r.dart", { valueCol: "FR", format: "dartTemplate", className: 'Translations' });
transformer.save("androidres/values/strings.xml", { valueCol: "NL", format: "android" });
transformer.save("androidres/values-fr/strings.xml", { valueCol: "FR", format: "android" });
transformer.save("ios/values/ios-nl.txt", { valueCol: "NL", format: "ios", encoding:'UCS-2' });
transformer.save("ios/values/ios-fr.txt", { valueCol: "FR", format: "ios", encoding:'UCS-2' });