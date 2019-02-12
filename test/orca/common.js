import 'app-module-path/register';
const server = require('chakram');
global.expect = server.expect;

// Modules
export const joi = require('joi');
export const dateFormat = require('dateformat');
export const path = require('path');
const generateString = require('randomstring');

// Passed variables
export var orca = getEnv();

// Test Tags
export const Tags = {
  smokeTest: '@smoke'
};

// Functions
export async function post(any, responseData) {
  if (any.headers == undefined) {
    any.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      cookie: `cid=${responseData.ccookie}; aid= ${responseData.token}; pid=${responseData.pcookie}`
    };
  }
  var response = await server.post(any.api, any.data, any);
  if (response.response.statusCode == 200) return response;
  else {
    throw `${any.data.operationName} POST request failed with Errorcode- ${response.response.statusCode} and Message- ${
      response.response.body.message
    }`;
  }
}

export function get(any) {
  return server.get(any.api + any.data);
}

export function put(any) {
  return server.put(any.api, any.data);
}

export function patch(any) {
  return server.patch(any.api, any.data);
}

export function del(any) {
  return server.delete(any.api + any.data);
}

export function randomString(opts) {
  opts = opts == undefined ? 10 : opts;
  let tag = process.env.QA_TAG == undefined ? '' : process.env.QA_TAG
  let timeNow = Date.now();
  let returnValue = tag + timeNow + generateString.generate(opts);
  return returnValue
}

// Private functions
function getArg(argType) {
  var vars, arg;
  process.argv.forEach(value => {
    if (/--.+:/.test(value)) {
      vars = value.split(':');
      if (vars[0] == `--${argType}`) {
        arg = vars[1];
      }
    }
  });
  return arg === undefined ? '' : arg;
}

function getEnv() {
  let environment = getArg('env');
  environment = environment == '' ? 'DEV' : environment.toUpperCase();
  return process.env[`ORCA_${environment}`];
}
