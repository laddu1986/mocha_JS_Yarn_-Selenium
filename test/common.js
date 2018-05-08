import "app-module-path/register";
const server = require('chakram');

global.expect = server.expect;
const mysql = require('mysql');
const config = require('config-yml');

const responseData = {
  organization: [],
  membership: [],
  identity: [],
  identityState: [],
  invites: [],
};
function bigName(params) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < params; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }

  return `test_${text}`;
}


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

function post(done, any) {
  return server.post(any.api, any.data)
    .then((response) => {
      // console.log(response.body);
      any.func(response);
      done();
    });
}
function get(done, any) {
  return server.get(any.api + any.data)
    .then((response) => {
      // console.log(response.body);
      any.func(response);
      done();
    });
}
function put(done, any) {
  return server.put(any.api, any.data)
    .then((response) => {
      // console.log(response.body);
      any.func(response);
      done();
    });
}
function patch(done, any) {
  return server.patch(any.api, any.data)
    .then((response) => {
      // console.log(response.body);
      any.func(response);
      done();
    });
}
function del(done, any) {
  return server.delete(any.api + any.data)
    .then((response) => {
      // console.log(response.body);
      any.func(response);
      done();
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

const testData = {
  name: bigName(10),
  email: bigName(15) + `@test.co`,
  organization: bigName(10) + `_Org`,
  space: bigName(8) + `_Space`,
  password: 'Pass1234',
};



export {
  // api
  post,
  get,
  put,
  patch,
  del,
  // library
  config,
  server,
  // db
  connection,
  end,
  // data
  responseData,
  bigName,
  testData,
};
