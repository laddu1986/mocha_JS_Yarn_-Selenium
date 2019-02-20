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

export const existingEmailData = identityData => {
  return {
    api: identities,
    data: {
      fullname: lib.randomString.generate(12),
      email: identityData.identityEmail,
      password: process.env.ACCOUNT_PASS
    },
    expected: `Email id ${identityData.identityEmail} already registered`
  };
};
