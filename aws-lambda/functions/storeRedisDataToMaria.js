'use strict'
require('dotenv').config();
var mysql = require('promise-mysql');
var redis = require('redis')

module.exports.getRedisData = (event, context, callback) => {
  console.log('getting Redis Data');

  const client = redis.createClient({ url: 'redis://mywebcahe1.fsgenx.0001.euc1.cache.amazonaws.com:6379' });

  console.log('err');

  client.on("error", (err) => {
    console.log('error there');
    client.quit();
    callback(err, null);
  });



  client.keys('*', function (err, keys) {
    err ? console.log(err) : null;

    const promises = keys.map(key => new Promise((resolve, reject) => {
      client.hgetall(key, (err, result) => {
        err ? reject(err) : null;
        resolve(result);
      });
    }));

    Promise
      .all(promises)
      .then(arr => {
        const response = {
          statusCode: 200,
          body: JSON.stringify({ data: arr })
        }
        client.quit();
        callback(null, response);
      })
      .catch(err => console.log(err))
  });


  mysql
    .createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    })
    
    .then((conn) => {
      const data = JSON.parse(event.body);
      Promise
      .all(data.map(item => new Promise((resolve) => {
          item.age = parseInt(item.age);
          conn
            .query(`INSERT INTO users (name, age) VALUES ('${item.name}', '${item.age}')`)
            .then(savedData => {
              let res = {...item}
              res.id = savedData.insertId;
              resolve(res);
          })
      })))
      .then(res => {
        conn.end();
        const response = {
          statusCode: 200,
          body: JSON.stringify(['Data successfully stored',res])
        }
        callback(null, response);
      })

    })
    .catch(err => console.log(err))







}