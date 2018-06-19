import * as lib from '../../common';

export const noEmail = {
    api: lib.config.api.identities,
    data: {
        fullname: lib.randomString.generate(12),
        password: 'Pass1234'
    },
    expected: 'Email cannot be empty'
};

export const noFullName = {
    api: lib.config.api.identities,
    data: {
        email: `${lib.randomString.generate(12)}@test.co`,
        password: 'Pass1234'
    },
    expected: 'Full name cannot be empty'
};

export const noPwd = {
    api: lib.config.api.identities,
    data: {
        fullname: lib.randomString.generate(12),
        email: `${lib.randomString.generate(12)}@test.co`,
    },
    expected: 'Password cannot be empty'
};

var emailDefined = `${lib.randomString.generate(12)}@test.co`;
export const existingEmailData = {
    api: lib.config.api.identities,
    data: {
        fullname: lib.randomString.generate(12),
        email: emailDefined,
        password: 'Pass1234'
    },
    expected: `Email id ${emailDefined} already registered`
};
