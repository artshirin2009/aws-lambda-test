'use strict'
require('dotenv').config();
var mysql = require('promise-mysql');
var redis = require('redis')

module.exports.hsetRedisFinal = (event, context, callback) => {
  const client = redis.createClient({ url: 'redis://mywebcahe1.fsgenx.0001.euc1.cache.amazonaws.com:6379' });
  client.on("error", (err) => {
    console.log('error there');
    client.quit();
    callback(err, null);
  });

  let user = JSON.parse(event.body);
  let hash = user.hash;
  client.hset(
    hash,
    `user-${user.id}`,
    JSON.stringify({
      id: user.id,
      name: user.name,
      age: user.age
    }),
    function (err, reply) {
      if (err) {
        return res.status(500).json({ message: `There was a problem with saving object to redis`, data: { ...err.errors } });
      }
      const response = {
        statusCode: 200,
        body: JSON.stringify(reply)
      }
      client.quit();
      callback(null, response);
    });
}