import * as lib from '../../common';
export const noName = {
    api: process.env.API_ORGANIZATIONS,
    data: {
        createdByAccountId: lib.responseData.negOrganization[0].id
    },
    expected: "The Name field is required."
};

export const blankAccountId = {
    api: process.env.API_ORGANIZATIONS,
    data: {
        name: lib.randomString.generate(10)
    },
    expected: "The Account Id field is required."
};
export const blankRowVersion = {
    api: process.env.API_ORGANIZATIONS,
    data: {
        id: lib.responseData.negOrganization[1].id,
        name: lib.randomString.generate(10)
    },
    expected: "A concurrency error has occurred."
};
export const blankName = {
    api: process.env.API_ORGANIZATIONS,
    data: {
        id: lib.responseData.negOrganization[1].id,
        name: "",
        rowVersion: lib.responseData.negOrganization[1].rowVersion
    },
    expected: "The Name field is required."
};
export const blankID = {
    api: process.env.API_ORGANIZATIONS,
    data: {
        id: "",
        name: lib.randomString.generate(10),
        rowVersion: lib.responseData.negOrganization[1].rowVersion
    },
    expected: "The Id field is required."
};

export const incorrectOrgIDPut = {
    api: process.env.API_ORGANIZATIONS,
    data: {
        id: lib.responseData.negOrganization[0].id,
        name: lib.randomString.generate(10),
        rowVersion: lib.responseData.negOrganization[1].rowVersion
    }
};

export const incorrectOrgIDGet = {
    api: process.env.API_ORGANIZATIONS,
    data: lib.responseData.negOrganization[0].id
};

export const incorrectOrgIdDelete = {
    api: process.env.API_ORGANIZATIONS,
    data: `${lib.responseData.negOrganization[0].id}?rowVersion=${lib.responseData.negOrganization[1].rowVersion}`,
    expected: "A concurrency error has occurred."
};

export const blankOrgIdDelete = {
    api: process.env.API_ORGANIZATIONS,
    data: ""
};