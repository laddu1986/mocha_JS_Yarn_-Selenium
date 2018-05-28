import "app-module-path/register";
const server = require('chakram');

global.expect = server.expect;
const mysql = require('mysql');
const config = require('config-yml');
var randomString = require("randomstring");

const responseData = {
  organization: [],
  membership: [],
  identity: [],
  identityState: [],
  invites: [],
  spaces: []
};
// uri end points
const orca = config.orca.base;
const web = config.web.base;

var con = mysql.createConnection({
  host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
  user: 'rouser',
  password: 'R34d0nlyK3y',
  database: 'organization_dev'
});

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

function post(any) {
  if (any.headers == undefined) {
    any.headers = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
  return server.post(any.api, any.data, any);
}
function get(any) {
  return server.get(any.api + any.data);
}
function put(any) {
  return server.put(any.api, any.data);
}
function patch(any) {
  return server.patch(any.api, any.data);
}
function del(any) {
  return server.delete(any.api + any.data);
}

export {
  // uri
  orca,
  web,
  // api calls
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
  con,
  end,
  // data
  responseData,
  randomString
};
