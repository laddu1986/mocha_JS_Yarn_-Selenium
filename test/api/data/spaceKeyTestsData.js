import * as lib from '../../common';
import { keys } from '../config/getEnv'


export const noSpaceIDPost = {
    api: `${keys}${lib.spaceKeyNegData.orgID}/keys`,
    data: {
        resource: 'space'
    },
    expected: "'Id' must not be empty.,Resource id cannot be empty"
};

export const blankSpaceIDPost = {
    api: `${keys}${lib.spaceKeyNegData.orgID}/keys`,
    data: {
        resource: 'space',
        id: ""
    },
    expected: "Resource id cannot be empty"
};

export const incorrectOrgIDPost = {
    api: `${keys}${lib.spaceKeyNegData.identityID}/keys`,
    data: {
        resource: 'space',
        id: lib.spaceKeyNegData.spaceID
    }
};

export const incorrectSpaceIDPost = {
    api: `${keys}${lib.spaceKeyNegData.orgID}/keys`,
    data: {
        resource: 'space',
        id: lib.spaceKeyNegData.orgID
    }
};

//****************PATCH***************************//

export const blankStatusPatch = {
    api: `${keys}${lib.spaceKeyNegData.orgID}/keys/${lib.spaceKeyNegData.spaceKeyValue}?rowVersion=${lib.spaceKeyNegData.spaceKeyRowVersion}`,
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
    api: `${keys}${lib.spaceKeyNegData.orgID}/keys/${lib.spaceKeyNegData.orgID}?rowVersion=${lib.spaceKeyNegData.spaceKeyRowVersion}`,
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
    api: `${keys}${lib.spaceKeyNegData.identityID}/keys/${lib.spaceKeyNegData.spaceKeyValue}?rowVersion=${lib.spaceKeyNegData.spaceKeyRowVersion}`,
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
    api: `${keys}${lib.spaceKeyNegData.orgID}/keys/${lib.spaceKeyNegData.orgID}?rowVersion=${lib.spaceKeyNegData.spaceKeyRowVersion}`,
    data: "",
    expected: "Key not found"
};

export const incorrectOrgIdDelete = {
    api: `${keys}${lib.spaceKeyNegData.identityID}/keys/${lib.spaceKeyNegData.spaceKeyValue}?rowVersion=${lib.spaceKeyNegData.spaceKeyRowVersion}`,
    data: ""
};