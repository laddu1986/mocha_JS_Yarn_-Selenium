
import assertions from './api/actions/assertions';
import del from './api/actions/delete';
import post from './api/actions/post';

<<<<<<< HEAD
const server = require('chakram');
=======
const chakram = require('chakram');
var cookieParser = require('cookie-parser');
>>>>>>> 0d0d9f47265e965904031d8f79bde1953bcceaeb

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
      console.log('Connected to Database!');
    });
  }
  return con;
}

function end() {
  con.end((err) => {
    if (err) throw err;
    console.log('Disconnected from Database!');
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

<<<<<<< HEAD
export { assertions, faker, config, server, del, post, connection, end };
=======
export { assertions, faker, config, chakram, del, post, connection, end, cookieParser };
>>>>>>> 0d0d9f47265e965904031d8f79bde1953bcceaeb
