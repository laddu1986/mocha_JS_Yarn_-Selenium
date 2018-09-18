import * as lib from '../../common';
import { organizations } from '../config/getEnv'

export const noName = {
    api: organizations,
    data: {
        createdByAccountId: lib.responseData.negOrganization[0].id
    },
    expected: "The Name field is required."
};

export const blankAccountId = {
    api: organizations,
    data: {
        name: lib.randomString.generate(10)
    },
    expected: "The Account Id field is required."
};
export const blankRowVersion = {
    api: organizations,
    data: {
        id: lib.responseData.negOrganization[1].id,
        name: lib.randomString.generate(10)
    },
    expected: "A concurrency error has occurred."
};
export const blankName = {
    api: organizations,
    data: {
        id: lib.responseData.negOrganization[1].id,
        name: "",
        rowVersion: lib.responseData.negOrganization[1].rowVersion
    },
    expected: "The Name field is required."
};
export const blankID = {
    api: organizations,
    data: {
        id: "",
        name: lib.randomString.generate(10),
        rowVersion: lib.responseData.negOrganization[1].rowVersion
    },
    expected: "The Id field is required."
};

export const incorrectOrgIDPut = {
    api: organizations,
    data: {
        id: lib.responseData.negOrganization[0].id,
        name: lib.randomString.generate(10),
        rowVersion: lib.responseData.negOrganization[1].rowVersion
    }
};

export const incorrectOrgIDGet = {
    api: organizations,
    data: lib.responseData.negOrganization[0].id
};

export const incorrectOrgIdDelete = {
    api: organizations,
    data: `${lib.responseData.negOrganization[0].id}?rowVersion=${lib.responseData.negOrganization[1].rowVersion}`,
    expected: "A concurrency error has occurred."
};

export const blankOrgIdDelete = {
    api: organizations,
    data: ""
};