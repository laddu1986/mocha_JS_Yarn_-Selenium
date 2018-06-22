import "app-module-path/register";
const server = require('chakram');
var joi = require('joi');
global.expect = server.expect;
const config = require('config-yml');
var randomString = require("randomstring");

const responseData = {
  organization: [],
  membership: [],
  identity: [],
  identityState: [],
  invites: [],
  spaces: [],
  spaceKey: [],
  negMembership: [],
  negIdentity: [],
  metrics: []
};

const testData = {
  identityData: [],
  organizationsData: [],
  invitesData: [],
  spacesData: []
}
// uri end points
const orca = config.orca.base;
const web = config.web.base;

const Sequelize = require('sequelize');
const mysql = new Sequelize('organization_dev', 'rouser', 'R34d0nlyK3y', {
  host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 30,
    min: 20,
    idle: 30000
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
  joi,
  testData,
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
  Sequelize,
  mysql,
  // data
  responseData,
  randomString
};
