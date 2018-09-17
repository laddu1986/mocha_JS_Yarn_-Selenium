import * as lib from '../../common';
import * as spaces from '../actions/spaces';
import * as organization from '../actions/organization';
import * as identity from '../actions/identity';
import * as Constants from 'data/constants.json';
var test;

describe('Categories API', () => {
  before((done) => { // Setup working environment
    // Create an identity
    // Create an organisation
    // Create a space
    identity.postIdentity(lib.responseData.categories).then(() => {
        organization.postOrganization(lib.responseData.categories).then(()=> {
            test = spaces.postSpaceByOrganizationId(lib.responseData.categories, true);
            done();
        });
    });
  });

  describe.only('Testing')
});