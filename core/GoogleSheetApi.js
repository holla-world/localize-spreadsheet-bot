const fs = require ('fs');
const readline = require ('readline');
const { google } = require ('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

function GoogleApiSheet (getGoogleSheet) {
    // Load client secrets from a local file.
    fs.readFile ('credentials.json', (err, content) => {
        if (err) return console.log ('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Sheets API.
        console.log ('content', JSON.parse (content));
        authorize (JSON.parse (content), (auth) => {
            const sheets = google.sheets ({ version : 'v4', auth });
            getGoogleSheet (sheets)
        });
    });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize (credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2 (
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile (TOKEN_PATH, (err, token) => {
        if (err) return getNewToken (oAuth2Client, callback);
        oAuth2Client.setCredentials (JSON.parse (token));
        callback (oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken (oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl ({
        access_type : 'offline',
        scope : SCOPES,
    });
    console.log ('Authorize this app by visiting this url:', authUrl);
    const rlinterface = readline.createInterface ({
        input : process.stdin,
        output : process.stdout,
    });
    rlinterface.question ('Enter the code from that page here: ', (code) => {
        console.log ('Token Out ...');

        oAuth2Client.getToken (code, (err, token) => {
            console.log ('oAuth2Client.getToken ...');

            if (err) return console.error ('Error while trying to retrieve access token', err);
            console.log ('Token stored ...');
            oAuth2Client.setCredentials (token);
            // Store the token to disk for later program executions
            fs.writeFile (TOKEN_PATH, JSON.stringify (token), (err) => {
                if (err) console.error (err);
                console.log ('Token stored to', TOKEN_PATH);
            });

            callback (oAuth2Client);
            rlinterface.close ();
        });
    });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1apRDff_DTfD0yAmNtzuTZMioer/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listData (auth) {
    const sheets = google.sheets ({ version : 'v4', auth });
    sheets.spreadsheets.values.get ({
        spreadsheetId : '1apRDff_DTfD0yAmNtzuTZMioer-PK5is200epqLrjnY',
        range : 'Base Data!A2:R',
    }, (err, res) => {
        if (err) return console.log ('The API returned an error: ' + err);
        const rows = res.data.values;
        if (rows.length) {
            console.log (JSON.stringify (rows));
        } else {
            console.log ('No data found.');
        }
    });
}

module.exports = GoogleApiSheet