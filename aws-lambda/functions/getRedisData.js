'use strict'
require('dotenv').config();
var mysql = require('promise-mysql');
var redis = require('redis')

module.exports.getRedisData = (event, context, callback) => {
  console.log('getting Redis Data');

  const client = redis.createClient({ url: 'redis://mywebcahe1.fsgenx.0001.euc1.cache.amazonaws.com:6379' });


  client.on("error", (err) => {
    console.log('error there');
    client.quit();
    callback(err, null);
  });
  let id = event.pathParameters.id;
  client.hgetall(id, function (err, obj) {
    if (!obj) {
      callback(err)
    }
    else {
      obj.id = id
      console.log(obj)
      const response = {
        statusCode: 200,
        body: JSON.stringify(obj)
      }
      client.quit();
      callback(null, response);

    }
  })


  // client.keys('*', function (err, keys) {
  //   err ? console.log(err) : null;
  //   console.log('keys')
  //   console.log(keys)
  //   const promises = keys.map(key => new Promise((resolve, reject) => {
  //     client.hgetall(key, (err, result) => {
  //       err ? reject(err) : null;
  //       resolve(result);
  //     });
  //   }));

  //   Promise
  //     .all(promises)
  //     .then(arr => {
  //       const response = {
  //         statusCode: 200,
  //         body: JSON.stringify({ data: arr })
  //       }
  //       client.quit();
  //       callback(null, response);

  //     }
  //     )


  //     .catch(err => console.log(err))
  // });

  // client.get("key", function (err, reply) {
  //   console.log(reply)
  //   const response = {
  //     statusCode: 200,
  //     body: JSON.stringify(reply)
  //   }
  //   client.quit();
  //   callback(null, response);
  // });



}