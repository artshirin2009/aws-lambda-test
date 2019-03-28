'use strict'
require('dotenv').config();
var mysql = require('promise-mysql');
var redis = require('redis')

module.exports.hgetallRedis = (event, context, callback) => {
  console.log('getting Redis Data');

  const client = redis.createClient({ url: 'redis://mywebcahe1.fsgenx.0001.euc1.cache.amazonaws.com:6379' });

  client.on("error", (err) => {
    console.log('error there');
    client.quit();
    callback(err, null);
  });
  let hash = event.pathParameters.hash;

  client.hgetall(hash, function (err, obj) {
    if (!obj) {
      callback(err)
    }
    else {
      console.log(obj)
      const response = {
        statusCode: 200,
        body: JSON.stringify(obj)
      }
      client.quit();
      callback(null, response);
    }
  })
}