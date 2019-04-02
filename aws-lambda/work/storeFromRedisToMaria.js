'use strict'
require('dotenv').config();
const mysql = require('promise-mysql');
const redis = require('redis');

module.exports.handler = (event, context, callback) => {
  const client = redis.createClient({ url: 'redis://mywebcahe1.fsgenx.0001.euc1.cache.amazonaws.com:6379' });
  //const client = redis.createClient();
  

// let hashes = []



// array.forEach(element => {
  
// });

/**affd */
  // client.hgetall("affd", async (err, result) => {
  //   const finArr = Object
  //     .keys(result)
  //     .map(key => JSON.parse(result[key]));
      
  //   const conn = await mysql.createConnection({
  //     host: process.env.HOST,
  //     user: process.env.USER,
  //     password: process.env.PASSWORD,
  //     database: process.env.DATABASE
  //   })

  //   Promise
  //     .all(finArr.map(item => new Promise(async (resolve) => {
  //       const savedData = await conn.query(`INSERT INTO aff_data (type_name, status_name, tracking_token, date, affiliate_name) VALUES ('${item.type_name}', '${item.status_name}','${item.tracking_token}','${item.date}','${item.affiliate_name}')`);
  //       const res = { ...item };
  //       console.log(savedData)
  //       res.id = savedData.idaff_data;
  //       resolve(res);
  //     })))
  //     .then(res => {
  //       conn.end();
  //       const response = { statusCode: 200, body: JSON.stringify(['Data successfully stored', res]) };
  //       callback(null, response);
  //     })
  //     .catch(err => console.log(err))
  // })


  /**out */
  client.hgetall("out", async (err, result) => {

    console.log('1-----------------------------', result);
    console.log('2-----------------------------', result[Object.keys(result)[0]]);

    // let copy_result = JSON.parse(JSON.stringify(result));

    Object.keys(result).forEach( hashKey => {

      const res = [];

      const array = result[hashKey].split(',');

      for (let index = 0; index < array.length; index+2) {
        res.push({key:array[index], value:array[index+1]})
      }

      result[hashKey] = res;

    });

    console.log('2-----------------------------',  result);
    callback(null, result);

    const finArr = Object.keys(result).map(key => JSON.parse(result[key]));
      
    const conn = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    })

    Promise
      .all(finArr.map(item => new Promise(async (resolve) => {
        const savedData = await conn.query(`INSERT INTO outbound_tokens (session_token, date, affiliate_name, list_pos, outbound_url, request_token, list_name) VALUES ('${item.session_token}', '${item.date}','${item.affiliate_name}','${item.list_pos}','${item.outbound_url}', '${item.request_token}', '${item.list_name}')`);
        
        const res = { ...item };
        console.log(savedData)
        //res.id = savedData.idaff_data;
        res.id = savedData.idoutbound_tokens
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