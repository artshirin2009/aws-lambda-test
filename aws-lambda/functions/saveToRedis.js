'use strict'
require('dotenv').config();
var mysql = require('promise-mysql');
var redis = require('redis')

module.exports.saveToRedis = (event, context, callback) => {
  console.log('start');

  const client = redis.createClient({ url: 'redis://mywebcahe1.fsgenx.0001.euc1.cache.amazonaws.com:6379' });

  console.log('err');

  client.on("error", (err) => {
    console.log('error there ftghg');
    client.quit();
    callback(err, null);
  });

  const data = JSON.parse(event.body);


  client.hmset(data.id, 'first_name', data.firstName, 'last_name', data.lastName, 'email', data.email , function (err, reply) {
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

  




 

  // mysql
  //   .createConnection({
  //     host: process.env.HOST,
  //     user: process.env.USER,
  //     password: process.env.PASSWORD,
  //     database: process.env.DATABASE
  //   })
  //   .then(function (conn) {
  //     var result = conn.query('SELECT * FROM users');
  //     conn.end();
  //     return result;
  //   })
  //   .then(function (results) {
  //     const response = {
  //       statusCode: 200,
  //       body: JSON.stringify(results)
  //     }
  //     callback(null, response);
  //   })


}