'use strict'
require('dotenv').config();
var mysql = require('promise-mysql');
var redis = require('redis')

module.exports.getRedis = (event, context, callback) => {
  console.log('start');

const client = redis.createClient({url: 'redis://mywebcahe1.fsgenx.0001.euc1.cache.amazonaws.com:6379'});

console.log('err');

client.on("error", (err)=>{
  console.log('error there');
  client.quit();
  callback(err, null);
});

client.on("ready", ()=>{
  console.log('on ready');
  const response = {
    statusCode: 200,
    body: JSON.stringify('Redis is ready')
  }
  client.quit();
  callback(null, response);
})


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