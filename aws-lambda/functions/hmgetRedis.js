'use strict'
require('dotenv').config();
var mysql = require('promise-mysql');
var redis = require('redis')

module.exports.hmgetRedis = (event, context, callback) => {
  console.log('getting Red is Data');

  const client = redis.createClient({ url: 'redis://mywebcahe1.fsgenx.0001.euc1.cache.amazonaws.com:6379' });

  client.on("error", (err) => {
    console.log('error there');
    client.quit();
    callback(err, null);
  });
  let hash = event.pathParameters.id;
  let value1 = event.pathParameters.value1;
  let value2 = event.pathParameters.value2;
  let value3 = event.pathParameters.value3;

  
  client.hkeys(hash, function (err, keys) {
    if (err) {
      return res.status(500).json({ message: `There was a problem with saving object to redis`, data: { ...err.errors } });
    }



    client.hmget(hash, value1, value2, value3, function (err, obj) {
      if (!obj) {
        callback(err)
      }
      else {
        console.log(keys);
        console.log(obj)
        const response = {
          statusCode: 200,
          body: JSON.stringify(obj)
        }
        client.quit();
        callback(null, response);
  
      }
    })




  });






  // client.hgetall(id, function (err, obj) {
  //   if (!obj) {
  //     callback(err)
  //   }
  //   else {
  //     obj.id = id
  //     console.log(obj)
  //     const response = {
  //       statusCode: 200,
  //       body: JSON.stringify(obj)
  //     }
  //     client.quit();
  //     callback(null, response);

  //   }
  // })


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