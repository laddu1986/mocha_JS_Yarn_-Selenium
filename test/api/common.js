import 'app-module-path/register';
export const server = require('chakram');
export const joi = require('joi');
export const dateFormat = require('dateformat');
export const path = require('path');
export const caller = require('grpc-caller');
const generateString = require('randomstring');

// Test Tags
// ---------------------------------------------------
export const Tags = {
  smokeTest: '@smoke'
};

// API
// ---------------------------------------------------
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

// JOI Check many strings for inclusion in many strings
// ---------------------------------------------------
export const CheckForAll = bits => string => bits.every(bit => string.includes(bit));

// String generator with prefix
// ---------------------------------------------------
export function randomString(opts, prefix, suffix) {
  opts = opts == undefined ? 10 : opts;
  prefix = prefix == undefined ? '' : prefix;
  suffix = suffix == undefined ? '' : suffix;
  return process.env.QA_TAG + prefix + generateString.generate(opts) + suffix;
}

global.expect = server.expect;
