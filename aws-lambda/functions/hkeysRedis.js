'use strict'
require('dotenv').config();
var mysql = require('promise-mysql');
var redis = require('redis')

module.exports.hkeysRedis = (event, context, callback) => {
  const client = redis.createClient({ url: 'redis://mywebcahe1.fsgenx.0001.euc1.cache.amazonaws.com:6379' });
  client.on("error", (err) => {
    console.log('error there');
    client.quit();
    callback(err, null);
  });

  const data = JSON.parse(event.body);
  client.hkeys(data.hash, function (err, reply) {
    if (err) {
      return res.status(500).json({ message: `There was a problem with saving object to redis`, data: { ...err.errors } });
    }
    console.log(reply);
    const response = {
      statusCode: 200,
      body: JSON.stringify(reply)
    }
    client.quit();
    callback(null, response);
  });
}