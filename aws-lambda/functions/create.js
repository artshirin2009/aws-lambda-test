'use strict'
require('dotenv').config();
const mysql = require('promise-mysql');

module.exports.create = (event, context, callback) => {

  console.log('start 1')
  mysql
    .createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    })
    
    .then((conn) => {
      console.log('start 2')
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