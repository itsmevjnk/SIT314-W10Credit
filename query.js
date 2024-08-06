/* load .env file */
require('dotenv').config();

const http = require('http');

const minCount = process.env.QUERY_MIN * 1;
const maxCount = process.env.QUERY_MAX * 1;

setInterval(() => {
    http.get(process.env.API_HOST + `/local/temps?count=${Math.random() * (maxCount - minCount) + minCount}`, (res) => {
        res.on('data', (chunk) => {
            let resp = JSON.parse(chunk);
            console.log(resp, `(${Object.keys(resp.data).length} entries)`);
        });
    });
}, process.env.QUERY_INTERVAL * 1);