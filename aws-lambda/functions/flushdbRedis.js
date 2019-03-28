'use strict'
require('dotenv').config();
var mysql = require('promise-mysql');
var redis = require('redis')

module.exports.flushdbRedis = (event, context, callback) => {
    console.log('getting Redis Data');

    const client = redis.createClient({ url: 'redis://mywebcahe1.fsgenx.0001.euc1.cache.amazonaws.com:6379' });


    client.on("error", (err) => {
        console.log('error there');
        client.quit();
        callback(err, null);
    });
    
    client.flushdb(function (err, succeeded) {
        console.log(succeeded); // will be true if successfull
        client.quit();
        callback(err, succeeded);
    });
}