import * as identityState from '../actions/identityState';
import * as identity from '../actions/identity';
import * as lib from '../../common';

describe('Identity State Api', () => {
  before('Connect to database', () => {
    // lib.connection({
    //   host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
    //   user: 'rouser',
    //   password: 'R34d0nlyK3y',
    //   database: 'membership_test',
    // });
  });
  describe('GET /identities/{id}/state', () => {
    it('Add a new user identity.', (done) => {
      identity.postIdentity(done, lib.responseData.identityState);
    });
    it('Return identity state by identity id.', (done) => {
      identityState.getIdentityStateById(done, lib.responseData.identityState);
    });
  });
  describe('PUT /identities/{id}/state', () => {
    it('Set identity state for an identity.', (done) => {
      identityState.putIdentityById(done, lib.responseData.identityState);
    });
  });
  describe('PATCH /identities/{id}/state', () => {
    it('Partial update identity state for an identity.', (done) => {
      identityState.patchIdentityStateById(done, lib.responseData.identityState);
    });
  });
  after('End message', () => {
    // lib.end();
  });
});
