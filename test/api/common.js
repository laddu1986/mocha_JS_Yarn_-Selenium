import 'app-module-path/register';
export const server = require('chakram');
export const joi = require('joi');
export const randomString = require('randomstring');
export const dateFormat = require('dateformat');
export const path = require('path');
export const caller = require('grpc-caller');

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
export const CheckForAll = bits => string => bits.every(bit => string.includes(bit));

global.expect = server.expect;
