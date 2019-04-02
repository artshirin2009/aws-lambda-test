'use strict'
require('dotenv').config();
var mysql = require('promise-mysql');
var redis = require('redis')

module.exports.hgetRedisFinal = (event, context, callback) => {
  const client = redis.createClient({ url: 'redis://mywebcahe1.fsgenx.0001.euc1.cache.amazonaws.com:6379' });
  client.on("error", (err) => {
    console.log('error there');
    client.quit();
    callback(err, null);
  });

  client.hgetall(event.pathParameters.hash, (err, result) => {
    console.log(result)
    // var arr = valuesToArray(result);
    // var finArr = []
    // arr.forEach(element => {
    //   finArr.push(JSON.parse(element))
    // });
    
    const response = {
      statusCode: 200,
      body: JSON.stringify(finArr)
    }
    client.quit();
    callback(null, response);
    function valuesToArray(obj) {
      return Object.keys(obj).map(function (key) { return obj[key]; });
    }
  })

}