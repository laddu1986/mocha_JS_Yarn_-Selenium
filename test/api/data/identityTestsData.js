import * as lib from '../../common';

export const noEmail = {
    api: process.env.API_IDENTITIES,
    data: {
        fullname: lib.randomString.generate(12),
        password: 'Pass1234'
    },
    expected: 'Email cannot be empty'
};

export const noFullName = {
    api: process.env.API_IDENTITIES,
    data: {
        email: `${lib.randomString.generate(12)}@test.co`,
        password: 'Pass1234'
    },
    expected: 'Full name cannot be empty'
};

export const noPwd = {
    api: process.env.API_IDENTITIES,
    data: {
        fullname: lib.randomString.generate(12),
        email: `${lib.randomString.generate(12)}@test.co`,
    },
    expected: 'Password cannot be empty'
};

var emailDefined = `${lib.randomString.generate(12)}@test.co`;
export const existingEmailData = {
    api: process.env.API_IDENTITIES,
    data: {
        fullname: lib.randomString.generate(12),
        email: emailDefined,
        password: 'Pass1234'
    },
    expected: `Email id ${emailDefined} already registered`
};
