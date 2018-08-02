import "app-module-path/register";
const server = require('chakram');
var joi = require('joi');
global.expect = server.expect;
var randomString = require("randomstring");
var NodeESModuleLoader = require('node-es-module-loader');
var loader = new NodeESModuleLoader();

const responseData = {
  organization: [],
  membership: [],
  identity: [],
  identityState: [],
  invites: [],
  spaces: [],
  spaceKey: [],
  metrics: [],
  negMembership: [],
  negIdentity: [],
  negInvites: [],
  negOrganization: [],
  negSpace: [],
  negSpaceKey: [],
  spaceSlug: [],
  orgSlug: [],
  users: [],
  visitors: []
};

const testData = {
  identityData: [],
  organizationsData: [],
  invitesData: [],
  spacesData: []
}

const Tags = {
  smokeTest: "@smoke"
}
console.log(DBNam)

const Sequelize = require('sequelize');
const mysql = new Sequelize(DBName, process.env.SQL_USERNAME, process.env.SQL_PASSWORD, {
  host: process.env.SQL_HOSTNAME,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 50,
    idle: 5000
  },
  logging: false
});

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
  Tags,
  loader,
  joi,
  testData,
  // api calls
  post,
  get,
  put,
  patch,
  del,
  // library
  server,
  // db
  Sequelize,
  mysql,
  // data
  responseData,
  randomString
};
