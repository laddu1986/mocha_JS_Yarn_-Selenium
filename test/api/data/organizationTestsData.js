import * as lib from '../common';
import { organizations } from 'config/getEnv';

export const noName = {
  api: organizations,
  data: {
    createdByAccountId: lib.orgNegData.identityID
  },
  expected: 'The Name field is required.'
};

export const blankAccountId = {
  api: organizations,
  data: {
    name: lib.randomString.generate(10)
  },
  expected: 'The Account Id field is required.'
};
export const blankRowVersion = {
  api: organizations,
  data: {
    id: lib.orgNegData.orgID,
    name: lib.randomString.generate(10)
  },
  expected: 'A concurrency error has occurred.'
};
export const blankName = {
  api: organizations,
  data: {
    id: lib.orgNegData.orgID,
    name: '',
    rowVersion: lib.orgNegData.orgRowVersion
  },
  expected: 'The Name field is required.'
};
export const blankID = {
  api: organizations,
  data: {
    id: '',
    name: lib.randomString.generate(10),
    rowVersion: lib.orgNegData.orgRowVersion
  },
  expected: 'The Id field is required.'
};

export const incorrectOrgIDPut = {
  api: organizations,
  data: {
    id: lib.orgNegData.identityID,
    name: lib.randomString.generate(10),
    rowVersion: lib.orgNegData.orgRowVersion
  }
};

export const incorrectOrgIDGet = {
  api: organizations,
  data: lib.orgNegData.identityID
};

export const incorrectOrgIdDelete = {
  api: organizations,
  data: `${lib.orgNegData.identityID}?rowVersion=${lib.orgNegData.orgRowVersion}`,
  expected: 'A concurrency error has occurred.'
};

export const blankOrgIdDelete = {
  api: organizations,
  data: ''
};
