const GSReader = require('./core/LineReader.js').GS;
const FileWriter = require('./core/Writer.js').File;
const Transformer = require('./core/Transformer.js');

const Gs2File = function (reader, writer) {
    this._reader = reader;
    this._writer = writer;
};

Gs2File.fromGoogleSpreadsheet = function (spreadsheetKey, sheets) {
    const gs2file = new Gs2File(
        //the reader
        new GSReader(spreadsheetKey, sheets),
        //the writer
        new FileWriter());
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
Gs2File.prototype.save = function (outputPath, opts, cb) {
    console.log('saving ' + outputPath);
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

    this._reader.select(keyCol, valueCol).then(function (lines) {
        if (lines) {
            const transformer = Transformer[format || 'android'];
            self._writer.write(outputPath, encoding, lines, transformer, opts);
        }
        if (typeof(cb) == 'function') {
            cb();
        }
    });
};
Gs2File.prototype.saveFlowTypeFileJs = function (outputPath, cb) {
    const self = this, encoding = 'utf8', keyCol = this._defaultKeyCol;
    this._reader.select(keyCol).then(function (lines) {
        if (lines) {
            self._writer.write(outputPath, encoding, lines, Transformer.flowtype);
        }
    });
    if (typeof(cb) == 'function') {
        cb();
    }
};
module.exports = Gs2File;