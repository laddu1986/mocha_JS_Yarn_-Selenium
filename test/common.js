import "app-module-path/register";
const server = require('chakram');
var joi = require('joi');
global.expect = server.expect;
var randomString = require("randomstring");
var NodeESModuleLoader = require('node-es-module-loader');
var loader = new NodeESModuleLoader();
var dateFormat = require('dateformat');
var path = require('path');
var caller = require('grpc-caller');

export const invitesNegData = new Object();
export const membershipNegData = new Object();
export const orgNegData = new Object();
export const spaceNegData = new Object();
export const spaceKeyNegData = new Object();

const responseData = {
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
  dateFormat,
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
  // data
  responseData,
  randomString,
  path,
  caller
};
