import "app-module-path/register";
const server = require('chakram');
var joi = require('joi');
global.expect = server.expect;
const config = require('config-yml');
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
  negSpace: []
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
// uri end points
const orca = config.orca.base;
const web = config.web.base;

const Sequelize = require('sequelize');
const mysql = new Sequelize('organization_dev', 'rouser', 'R34d0nlyK3y', {
  host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
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
