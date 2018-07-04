import * as lib from '../../common';

export const noSpaceIDPost = {
    api: `${lib.config.api.keys}${lib.responseData.negSpaceKey[1].id}/keys`,
    data: {
        resource: 'space'
    },
    expected: "'Id' must not be empty.,Resource id cannot be empty"
};

export const blankSpaceIDPost = {
    api: `${lib.config.api.keys}${lib.responseData.negSpaceKey[1].id}/keys`,
    data: {
        resource: 'space',
        id: ""
    },
    expected: "Resource id cannot be empty"
};

export const incorrectOrgIDPost = {
    api: `${lib.config.api.keys}${lib.responseData.negSpaceKey[0].id}/keys`,
    data: {
        resource: 'space',
        id: lib.responseData.negSpaceKey[2].id
    }
};

export const incorrectSpaceIDPost = {
    api: `${lib.config.api.keys}${lib.responseData.negSpaceKey[1].id}/keys`,
    data: {
        resource: 'space',
        id: lib.responseData.negSpaceKey[1].id
    }
};

//****************PATCH***************************//

export const blankStatusPatch = {
    api: `${lib.config.api.keys}${lib.responseData.negSpaceKey[1].id}/keys/${lib.responseData.negSpaceKey[3].value}?rowVersion=${lib.responseData.negSpaceKey[3].rowVersion}`,
    data: [
        {
            "op": "replace",
            "path": "/rowStatus",
            "value": ""
        }
    ],
    expected: "Not a valid status:"
};

export const incorrectKeyPatch = {
    api: `${lib.config.api.keys}${lib.responseData.negSpaceKey[1].id}/keys/${lib.responseData.negSpaceKey[1].id}?rowVersion=${lib.responseData.negSpaceKey[3].rowVersion}`,
    data: [
        {
            "op": "replace",
            "path": "/rowStatus",
            "value": "Active"
        }
    ],
    expected: "Key not found"
};

export const incorrectOrgIdPatch = {
    api: `${lib.config.api.keys}${lib.responseData.negSpaceKey[0].id}/keys/${lib.responseData.negSpaceKey[3].value}?rowVersion=${lib.responseData.negSpaceKey[3].rowVersion}`,
    data: [
        {
            "op": "replace",
            "path": "/rowStatus",
            "value": "Active"
        }
    ]
};

//************************************ DELETE**********************************/

export const incorrectKeyDelete = {
    api: `${lib.config.api.keys}${lib.responseData.negSpaceKey[1].id}/keys/${lib.responseData.negSpaceKey[1].id}?rowVersion=${lib.responseData.negSpaceKey[3].rowVersion}`,
    data: "",
    expected: "Key not found"
};

export const incorrectOrgIdDelete = {
    api: `${lib.config.api.keys}${lib.responseData.negSpaceKey[0].id}/keys/${lib.responseData.negSpaceKey[3].value}?rowVersion=${lib.responseData.negSpaceKey[3].rowVersion}`,
    data: ""
};