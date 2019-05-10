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

// Context Data
export const Context = new Object({
  set context(contextData) {
    (this.spaceId = contextData.spaceID), (this.organizationId = contextData.orgID);
  },
  set cookies(res) {
    this.ccookie = JSON.stringify(res.response.headers['set-cookie'][2])
      .split(';')[0]
      .split('=')[1];
    this.token = JSON.stringify(res.response.headers['set-cookie'][1])
      .split(';')[0]
      .split('=')[1];
    this.pcookie = JSON.stringify(res.response.headers['set-cookie'])
      .split(';')[0]
      .split('=')[1];
  }
});

// Functions
export async function post(any) {
  if (any.headers == undefined) {
    any.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      cookie: `cid=${Context.ccookie}; aid= ${Context.token}; pid=${Context.pcookie}`
    };
  }
  var response = await server.post(any.api, any.data, any);
  if (response.response.statusCode == 200) return response;
  else {
    throw `${any.data.operationName} POST request failed with Errorcode- ${
      response.response.statusCode
    } and Message- ${JSON.stringify(response.response.body.errors)}`;
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
  let tag = process.env.QA_TAG == undefined ? '' : process.env.QA_TAG;
  let returnValue = tag + generateString.generate(opts);
  return returnValue;
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
