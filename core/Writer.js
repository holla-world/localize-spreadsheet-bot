var fs = require ("fs");
var EOL = require ("os").EOL;

var PlainWriter = function () {

};

PlainWriter.prototype.write = function (filePath, encoding, lines, transformer) {
    var fileContent = '';
    if (fs.existsSync (filePath)) {
        fileContent = fs.readFileSync (filePath, encoding);
    }
    //var valueToInsert = this.getTransformedLines(lines, transformer);
    //var output = transformer.insert(fileContent, valueToInsert, options);
    var content_now = this.linesGlue (lines);
    writeFileAndCreateDirectoriesSync (filePath, content_now, "utf8");
};
PlainWriter.prototype.linesGlue = function (lines) {
    var valueToInsert = "";
    for (var i = 0; i < lines.length; i++) {
        var lineContent = lines[i];
        valueToInsert += lineContent;
        if (i != lines.length - 1) {
            valueToInsert += EOL;
        }
    }
    return valueToInsert;
};

var FileWriter = function () {
};
FileWriter.prototype.write = function (filePath, encoding, lines, transformer, options) {
    var fileContent = '';
    if (fs.existsSync (filePath)) {
        fileContent = fs.readFileSync (filePath, encoding);
    }

    var valueToInsert = this.getTransformedLines (lines, transformer);

    var output = transformer.insert (fileContent, valueToInsert, options);

    writeFileAndCreateDirectoriesSync (filePath, output, "utf8");
};

//https://gist.github.com/jrajav/4140206
var writeFileAndCreateDirectoriesSync = function (filepath, content, encoding) {
    var mkpath = require ("mkpath");
    var path = require ("path");

    var dirname = path.dirname (filepath);
    mkpath.sync (dirname);

    fs.writeFileSync (filepath, content, encoding);
};

FileWriter.prototype.getTransformedLines = function (lines, transformer) {
    var valueToInsert = '';
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (!line.isEmpty ()) {
            if (line.isComment ()) {
                valueToInsert += transformer.transformComment (line.getComment ());
            } else {
                valueToInsert += transformer.transformKeyValue (line.getKey (), line.getValue ());
            }
        }
        if (i != lines.length - 1) {
            valueToInsert += EOL;
        }
    }

    return valueToInsert;
};
var FakeWriter = function () {

};

FakeWriter.prototype.write = function (filePath, lines, transformer) {

};

module.exports = { File : FileWriter, Fake : FakeWriter, RegularFileWriter : PlainWriter };
