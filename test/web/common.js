import 'app-module-path/register';
const server = require('chakram');
const generateString = require('randomstring');

global.expect = server.expect;

export const dateFormat = require('dateformat');

export const responseData = {
  users: [],
  visitors: []
};

export const sortAlphabetically = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());

export const Tags = {
  smokeTest: '@smoke'
};

export function post(any) {
  if (any.headers == undefined) {
    any.headers = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
  return server.post(any.api, any.data, any);
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