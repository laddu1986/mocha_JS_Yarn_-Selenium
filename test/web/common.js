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

export function randomString(opts, prefix, suffix) {
  opts = opts == undefined ? 10 : opts;
  prefix = prefix == undefined ? '' : prefix;
  suffix = suffix == undefined ? '' : suffix;
  return process.env.QA_TAG + prefix + generateString.generate(opts) + suffix;
}
