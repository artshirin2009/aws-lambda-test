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

  let item = JSON.parse(event.body);
  let hash = item.hash;
  console.log('there')
  // client.hset(
  //   hash,
  //   `${hash}-${item.id}`,
  //   JSON.stringify({
  //     type_name: item.type_name,
  //     status_name: item.status_name,
  //     tracking_token: item.tracking_token,
  //     date: item.date,
  //     affiliate_name: item.affiliate_name
  //   }),
  //   function (err, reply) {
  //     if (err) {
  //       return res.status(500).json({ message: `There was a problem with saving object to redis`, data: { ...err.errors } });
  //     }
  //     console.log('there - end')
  //     const response = {
  //       statusCode: 200,
  //       body: JSON.stringify(reply)
  //     }
  //     client.quit();
  //     callback(null, response);
  //   });

  client.hset(
    hash,
    `${hash}-${item.id}`,
    JSON.stringify({
      session_token: item.session_token,
      date: item.date,
      affiliate_name: item.affiliate_name,
      list_pos: item.list_pos,
      outbound_url: item.outbound_url,
      request_token: item.request_token,
      list_name: item.list_name
    }),
    function (err, reply) {
      if (err) {
        return res.status(500).json({ message: `There was a problem with saving object to redis`, data: { ...err.errors } });
      }
      console.log('there - end')
      const response = {
        statusCode: 200,
        body: JSON.stringify(reply)
      }
      client.quit();
      callback(null, response);
    });


}