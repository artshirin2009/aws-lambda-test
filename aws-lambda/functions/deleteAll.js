'use strict'
require('dotenv').config();
var mysql = require('promise-mysql');

module.exports.deleteAll = (event, context, callback) => {

  mysql
    .createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    })
    .then(function (conn) {
      var result = conn.query('SELECT * FROM users');
      conn.query(`DELETE FROM users`);
      conn.end();
      return result;
    })
    .then(function (results) {
      const response = {
        statusCode: 200,
        body: JSON.stringify(results)
      }
      callback(null, response);
    })
}
