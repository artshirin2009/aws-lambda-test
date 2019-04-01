'use strict'
require('dotenv').config();
const mysql = require('promise-mysql');
const redis = require('redis');

module.exports.createUsersInDb = (event, context, callback) => {
  const client = redis.createClient({ url: 'redis://mywebcahe1.fsgenx.0001.euc1.cache.amazonaws.com:6379' });
  client.on("error", err => {
    client.quit();
    callback(err, null);
  });

  client.hgetall("hash:new", async (err, result) => {
    const finArr = Object
      .keys(result)
      .map(key => JSON.parse(result[key]));
      
    const conn = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    })

    Promise
      .all(finArr.map(item => new Promise(async (resolve) => {
        item.age = parseInt(item.age);
        const savedData = await conn.query(`INSERT INTO users (name, age) VALUES ('${item.name}', '${item.age}')`);
        const res = { ...item };
        res.id = savedData.insertId;
        resolve(res);
      })))
      .then(res => {
        conn.end();
        const response = { statusCode: 200, body: JSON.stringify(['Data successfully stored', res]) };
        callback(null, response);
      })
      .catch(err => console.log(err))

  })

  client.quit();

}