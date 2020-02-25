const server = require ('server');
const { get, post } = server.router;
const { render, error, redirect, status, file, download, jsonp } = server.reply;

const worker = require ('./workspace/localizejson.js')

const options = {
    public,  // renamed on the argument so
    port : 2011,  // Will already use the env if provided
    parser : {
        body : { limit : '1mb' },
        json : { limit : '10mb' }
    }
};


const routes = [
    get ('/updatelang', ctx => {
        worker (function () {
            download ('./samples/bbgc_app/language_zh.txt', 'zh language');
            download ('./samples/bbgc_app/language_tw.txt', 'tw language');
            download ('./samples/bbgc_app/language_en.txt', 'en language');
        })
    })
];

server (options, routes, error (ctx => status (500).send (ctx.error.message)));
