/**
 * Created by hesk on 4/4/2017.
 */
var Localize = require("../index.js");
var transformer = Localize.fromGoogleSpreadsheet("0Aq6WlQdq71FydGZINE5LREtNZ09kb0YtNVN4NnJwWnc", '*');
transformer.setKeyCol('KEY');
transformer.saveFlowTypeFileJs("flow/translation_types.js");