import '../common';
import { keys } from 'config/getEnv';

export function noSpaceIDPost(spaceKeyNegData) {
  return {
    api: `${keys}${spaceKeyNegData.orgID}/keys`,
    data: {
      resource: 'space'
    },
    expected: "'Id' must not be empty.,Resource id cannot be empty"
  };
}

export function blankSpaceIDPost(spaceKeyNegData) {
  return {
    api: `${keys}${spaceKeyNegData.orgID}/keys`,
    data: {
      resource: 'space',
      id: ''
    },
    expected: 'Resource id cannot be empty'
  };
}

export function incorrectOrgIDPost(spaceKeyNegData) {
  return {
    api: `${keys}${spaceKeyNegData.identityID}/keys`,
    data: {
      resource: 'space',
      id: spaceKeyNegData.spaceID
    }
  };
}

export function incorrectSpaceIDPost(spaceKeyNegData) {
  return {
    api: `${keys}${spaceKeyNegData.orgID}/keys`,
    data: {
      resource: 'space',
      id: spaceKeyNegData.orgID
    }
  };
}

//****************PATCH***************************//

export function blankStatusPatch(spaceKeyNegData) {
  return {
    api: `${keys}${spaceKeyNegData.orgID}/keys/${spaceKeyNegData.spaceKeyValue}?rowVersion=${
      spaceKeyNegData.spaceKeyRowVersion
    }`,
    data: [
      {
        op: 'replace',
        path: '/rowStatus',
        value: ''
      }
    ],
    expected: 'Not a valid status:'
  };
}

export function incorrectKeyPatch(spaceKeyNegData) {
  return {
    api: `${keys}${spaceKeyNegData.orgID}/keys/${spaceKeyNegData.orgID}?rowVersion=${
      spaceKeyNegData.spaceKeyRowVersion
    }`,
    data: [
      {
        op: 'replace',
        path: '/rowStatus',
        value: 'Active'
      }
    ],
    expected: 'Key not found'
  };
}

export function incorrectOrgIdPatch(spaceKeyNegData) {
  return {
    api: `${keys}${spaceKeyNegData.identityID}/keys/${spaceKeyNegData.spaceKeyValue}?rowVersion=${
      spaceKeyNegData.spaceKeyRowVersion
    }`,
    data: [
      {
        op: 'replace',
        path: '/rowStatus',
        value: 'Active'
      }
    ]
  };
}

//************************************ DELETE**********************************/
export function incorrectKeyDelete(spaceKeyNegData) {
  return {
    api: `${keys}${spaceKeyNegData.orgID}/keys/${spaceKeyNegData.orgID}?rowVersion=${
      spaceKeyNegData.spaceKeyRowVersion
    }`,
    data: '',
    expected: 'Key not found'
  };
}

export function incorrectOrgIdDelete(spaceKeyNegData) {
  return {
    api: `${keys}${spaceKeyNegData.identityID}/keys/${spaceKeyNegData.spaceKeyValue}?rowVersion=${
      spaceKeyNegData.spaceKeyRowVersion
    }`,
    data: ''
  };
}
