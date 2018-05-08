import * as spaces from '../actions/spaces';
import * as organization from '../actions/organization';
import * as identity from '../actions/identity';
import * as membership from '../actions/membership';
import * as lib from '../../common';

describe('Identity Api', () => {
  before('Connect to database', () => {
    // lib.connection({
    //   host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
    //   user: 'rouser',
    //   password: 'R34d0nlyK3y',
    //   database: 'membership_test',
    // });
  });
  describe('POST /org/{org-id}/space', () => {
    it('Posting idenity details', (done) => {
      identity.postIdentity(done, lib.responseData.spaces);
    });

    it('Posting organization details', (done) => {
      organization.postOrganization(done, lib.responseData.spaces);
    });
    // it('Posting membership details', (done) => {
    //   membership.postMembership(done, lib.responseData.spaces);
    // });
    it('Create a new space.', (done) => {
      spaces.postSpaceByOrganizationId(done, lib.responseData.spaces);
    });
  });
  // describe('POST /org/{org-id}/space/key', () => {
  //   it('Create a new space and a key.', (done) => {
  //     identity.postIdentity(done, lib.responseData.identity);
  //   });
  // });
  describe('GET /org/{org-id}/space', () => {
    it('Get a space by ID.', (done) => {
      spaces.getSpacesByOrganizationId(done, lib.responseData.spaces);
    });
  });
  // describe('GET /org/{org-id}/space/{spaceId}', () => {
  //   it('Get All Spaces for an Organization.', (done) => {
  //     identity.getIdentityById(done, lib.responseData.identity);
  //   });
  // });
  after('End message', () => {
    // lib.end();
  });
});
