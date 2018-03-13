
import assertions from './api/actions/assertions';
import del from './api/actions/delete';
import post from './api/actions/post';

const server = require('chakram');

global.expect = server.expect;
const mysql = require('mysql');
const config = require('config-yml');
const faker = require('faker');

let con = null;

function connection(params) {
  if (!con) {
    con = mysql.createConnection(params);
    con.connect((err) => {
      if (err) throw err;
      console.log('Connected!');
    });
  }
  return con;
}

function end() {
  con.end((err) => {
    if (err) throw err;
    console.log('Disconnected!');
  });
}

// const con = mysql.createConnection({
//   host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
//   user: 'rouser',
//   password: 'R34d0nlyK3y',
//   database: 'membership_test',
// });

// con.connect((err) => {
//   if (err) throw err;
//   console.log('Connected!');
// });

// con.end();

export { assertions, faker, config, server, del, post, connection, end };
