import * as lib from '../common';
import { identities } from 'config/getEnv';

export const noEmail = {
  api: identities,
  data: {
    fullname: lib.randomString.generate(12),
    password: process.env.ACCOUNT_PASS
  },
  expected: 'Email cannot be empty'
};

export const noFullName = {
  api: identities,
  data: {
    email: `${lib.randomString.generate(12)}@test.co`,
    password: process.env.ACCOUNT_PASS
  },
  expected: 'Full name cannot be empty'
};

export const noPwd = {
  api: identities,
  data: {
    fullname: lib.randomString.generate(12),
    email: `${lib.randomString.generate(12)}@test.co`
  },
  expected: 'Password cannot be empty'
};

var emailDefined = `${lib.randomString.generate(12)}@test.co`;
export const existingEmailData = {
  api: identities,
  data: {
    fullname: lib.randomString.generate(12),
    email: emailDefined,
    password: process.env.ACCOUNT_PASS
  },
  expected: `Email id ${emailDefined} already registered`
};
