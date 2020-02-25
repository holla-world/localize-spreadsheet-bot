var GSReader = require ('./core/LineReader.js').GSV4;
var FileWriter = require ('./core/Writer.js').File;
var SplitProcess = require ('./core/SplitProcess');
var Transformer = require ('./core/Transformer');
var Gs2File = function (reader, writer) {
    this._reader = reader;
    this._writer = writer;
};
Gs2File.fromGoogleSpreadsheet = function (spreadsheetKey, sheetId, after) {
    var gs2file = new Gs2File (
        new GSReader (spreadsheetKey, sheetId, after),
        new FileWriter ()
    );
    return gs2file;
};
Gs2File.prototype.setValueCol = function (valueCol) {
    this._defaultValueCol = valueCol;
};
Gs2File.prototype.setKeyCol = function (keyCol) {
    this._defaultKeyCol = keyCol;
};
Gs2File.prototype.setFormat = function (format) {
    this._defaultFormat = format;
};
Gs2File.prototype.setEncoding = function (encoding) {
    this._defaultEncoding = encoding;
};
Gs2File.prototype.programSplit = function (path, parentPath, lang) {
    var VK = new SplitProcess (path, parentPath, lang, function () {
        console.log ("process is not done here");
    });
};
Gs2File.prototype.save = function (outputPath, opts, cb) {
    console.log ('saving ' + outputPath);
    var self = this;

    opts = opts || {};

    var keyCol = opts.keyCol,
        valueCol = opts.valueCol,
        format = opts.format,
        encoding = opts.encoding;

    if (!keyCol) {
        keyCol = this._defaultKeyCol;
    }

    if (!valueCol) {
        valueCol = this._defaultValueCol;
    }

    if (!format) {
        format = this._defaultFormat;
    }

    if (!encoding) {
        encoding = this._defaultEncoding;
        if (!encoding) {
            encoding = 'utf8';
        }
    }
    console.log ("enter line start", keyCol, valueCol);
    this._reader.select (keyCol, valueCol).then (function (lines) {
        if (lines) {
            var transformer = Transformer[format || 'android'];
            self._writer.write (outputPath, encoding, lines, transformer, opts);
            // console.log ("enter line");
        }

        if (typeof cb == 'function') {
            cb ();
        }
    });
};
module.exports = Gs2File;
