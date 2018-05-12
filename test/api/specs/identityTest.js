import * as lib from '../../common';
import * as identity from 'api/actions/identity';

describe('Identity Api', () => {
  before('Connect to database', () => {
    // lib.connection({
    //   host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
    //   user: 'rouser',
    //   password: 'R34d0nlyK3y',
    //   database: 'membership_test',
    // });
  });
  describe('POST /identities ', () => {
    it('Add a new user identity.', (done) => {
      identity.postIdentity(done, lib.responseData.identity);
    });
  });
  describe('GET /identities/{id}', () => {
    it('Get a identity by its id.', (done) => {
      identity.getIdentityById(done, lib.responseData.identity);
    });
  });
  describe('Delete /identities/{id}', () => {
    it('Delete an identity by its id.', (done) => {
      identity.deleteIdentityById(done, lib.responseData.identity);
    });
  });
  after('End message', () => {
    // lib.end();
  });
});
