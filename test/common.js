const server = require('chakram');

global.expect = server.expect;
const mysql = require('mysql');
const config = require('config-yml');
const faker = require('faker');

const fullname = (faker.name.findName()).replace('.', '');
const email = `test_${faker.internet.email()}`;
const password = faker.internet.password();
const res = [];
const idata = {
  fullname,
  email,
  password,
};
const odata = {
  name: (faker.name.findName()).replace('.', ''),
};

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

function assertion(e, data) {
  //   console.log(e);
  e.forEach((expected) => {
    expect(expected).to.equal(data);
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

export {
  // api
  post,
  get,
  del,
  // library
  faker,
  config,
  server,
  // db
  connection,
  end,
  // data
  idata,
  odata,
  res,
};
