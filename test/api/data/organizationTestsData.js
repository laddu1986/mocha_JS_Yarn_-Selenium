import { randomString } from '../common';
import { organizations } from 'config/getEnv';

export function noName(orgNegData) {
  return {
    api: organizations,
    data: {
      createdByAccountId: orgNegData.identityID
    },
    expected: 'The Name field is required.'
  };
}
export const blankAccountId = {
  api: organizations,
  data: {
    name: randomString.generate(10)
  },
  expected: 'The Account Id field is required.'
};

export function blankRowVersion(orgNegData) {
  return {
    api: organizations,
    data: {
      id: orgNegData.orgID,
      name: randomString.generate(10)
    },
    expected: 'A concurrency error has occurred.'
  };
}

export function blankName(orgNegData) {
  return {
    api: organizations,
    data: {
      id: orgNegData.orgID,
      name: '',
      rowVersion: orgNegData.orgRowVersion
    },
    expected: 'The Name field is required.'
  };
}

export function blankID(orgNegData) {
  return {
    api: organizations,
    data: {
      id: '',
      name: randomString.generate(10),
      rowVersion: orgNegData.orgRowVersion
    },
    expected: 'The Id field is required.'
  };
}

export function incorrectOrgIDPut(orgNegData) {
  return {
    api: organizations,
    data: {
      id: orgNegData.identityID,
      name: randomString.generate(10),
      rowVersion: orgNegData.orgRowVersion
    }
  };
}

export function incorrrectOrgIDGet(orgNegData) {
  return {
    api: organizations,
    data: orgNegData.identityID
  };
}

export function incorrectOrgIDDelete(orgNegData) {
  return {
    api: organizations,
    data: `${orgNegData.identityID}?rowVersion=${orgNegData.orgRowVersion}`,
    expected: 'A concurrency error has occurred.'
  };
}

export const blankOrgIdDelete = {
  api: organizations,
  data: ''
};
