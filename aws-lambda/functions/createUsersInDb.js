'use strict'
require('dotenv').config();
var mysql = require('promise-mysql');
var redis = require('redis')

module.exports.createUsersInDb = (event, context, callback) => {
  const client = redis.createClient({ url: 'redis://mywebcahe1.fsgenx.0001.euc1.cache.amazonaws.com:6379' });
  client.on("error", (err) => {
    console.log('error there');
    client.quit();
    callback(err, null);
  });

  client.hgetall("hash:new", (err, result) => {
    var arr = valuesToArray(result);
    var finArr = []
    arr.forEach(element => {
      finArr.push(JSON.parse(element))
    });


    console.log(finArr);
    mysql
      .createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
      })

      .then((conn) => {
        console.log('start 2')
        const data = finArr;
        Promise
          .all(data.map(item => new Promise((resolve) => {
            item.age = parseInt(item.age);
            conn
              .query(`INSERT INTO users (name, age) VALUES ('${item.name}', '${item.age}')`)
              .then(savedData => {
                let res = { ...item }
                res.id = savedData.insertId;
                resolve(res);
              })
          })))
          .then(res => {
            conn.end();
            const response = {
              statusCode: 200,
              body: JSON.stringify(['Data successfully stored', res])
            }
            callback(null, response);
          })

      })
      .catch(err => console.log(err))






    // const response = {
    //   statusCode: 200,
    //   body: JSON.stringify(finArr)
    // }
    client.quit();
    // callback(null, response);
    function valuesToArray(obj) {
      return Object.keys(obj).map(function (key) { return obj[key]; });
    }
  })

}