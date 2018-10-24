import 'app-module-path/register';
const server = require('chakram');
global.expect = server.expect;
var randomString = require('randomstring');
var dateFormat = require('dateformat');

export const responseData = {
  users: [],
  visitors: []
};

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
const sortAlphabetically = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());

export { dateFormat, randomString, sortAlphabetically };
