import * as lib from '../../common';
import * as organization from 'api/actions/organization';

describe('Organizations Api', () => {
  before('Connect to database', () => {
    // lib.connection({
    //   host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
    //   user: 'rouser',
    //   password: 'R34d0nlyK3y',
    //   database: 'membership_test',
    // });
  });
  describe('POST /organizations', () => {
    it('Create a new organization.', (done) => {
      // first post
      organization.postOrganization(done, lib.responseData.organization);
    });
  });
  describe('GET /organizations/{id}', () => {
    it('Get a organizations by its id.', (done) => {
      organization.getOrganizationById(done, lib.responseData.organization);
    });
  });
  describe('GET /organizations', () => {
    it('List all organizations.', () => {
      organization.getOrganizations();
    });
    // it('Schema check.', () => lib.server.get(lib.config.api.organizations)
    //   .then((i) => {
    //     // console.log(i.body);
    //     expect(i.body).to.have.schema([{
    //       id: 'string',
    //       identityId: 'string',
    //       organizationId: 'string',
    //     }]);
    //   }));
  });
  describe('PUT /organization', () => {
    it('Post organization.', (done) => {
      organization.putOrganization(done, lib.responseData.organization);
    });
  });
  describe('POST /organizations/list', () => {
    it('List of organizations by their id.', (done) => {
      // second post
      organization.postOrganization(done, lib.responseData.organization);
      organization.postOrganizations(done, lib.responseData.organization);
    });
  });
  describe('DELETE /organizations/{id}', () => {
    it('Delete a organization.', (done) => {
      organization.deleteOrganizationById(done, lib.responseData.organization);
    });
  });
  after('End message', () => {
    // lib.end();
  });
});
