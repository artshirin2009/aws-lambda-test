'use strict'
require('dotenv').config();
var mysql = require('promise-mysql');

module.exports.deleteOne = (event, context, callback) => {

  mysql
    .createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    })
    .then(function (conn) {
      var itemToDel = conn.query(`SELECT * FROM users WHERE id=${event.pathParameters.id}`);
      conn.query(`DELETE FROM users WHERE id=${event.pathParameters.id}`);
      console.log(itemToDel)
      conn.end();
      return itemToDel;
    })
    .then(function (results) {
      const response = {
        statusCode: 200,
        body: JSON.stringify(results)
      }
      callback(null, response);
    })
}
