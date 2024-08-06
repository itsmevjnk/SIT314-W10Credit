/* load .env file */
require('dotenv').config();

const http = require('http');
const url = require('url');

const parsedURL = url.parse(process.env.API_HOST);
const body = {
    sensor_id: process.env.SENSOR_ID,
    temperature: 0 // TBD
};

const tempMin = process.env.SENSOR_MIN * 1;
const tempMax = process.env.SENSOR_MAX * 1;

setInterval(() => {
    body.temperature = Math.random() * (tempMax - tempMin) + tempMin;
    let bodyStr = JSON.stringify(body);
    // console.log(bodyStr);
    http.request({
        hostname: parsedURL.hostname, // localhost
        port: parsedURL.port * 1,
        path: '/local/temps', // API endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(bodyStr)
        }
    }, (res) => {
        res.on('data', (chunk) => {
            let resp = JSON.parse(chunk);
            console.log(resp);
        });
    }).end(bodyStr);
}, process.env.SENSOR_INTERVAL * 1);