import * as lib from '../../common';
import * as organization from 'api/actions/organization';
import * as membership from 'api/actions/membership';
import * as identity from 'api/actions/identity';

var createResponse, getByAccountIDResponse, getByOrgIDResponse, deleteResponse, getResponse;

describe(`Memberships Api\n`, () => {

  describe(`POST /memberships\n`, () => {
    before((done) => {
      identity.postIdentity(lib.responseData.membership).then(() => {
        organization.postOrganization(lib.responseData.membership).then(() => {
          createResponse = membership.postMembership(lib.responseData.membership);
          done();
        })
      })
    });
    it('Create a new membership', () => {
      return createResponse.then((response) => {
        expect(response).to.have.status(201);
      })
    });
  });

  describe(`\nGET /memberships/account/{id}\n`, () => {
    before((done) => {
      getByAccountIDResponse = membership.getMembershipByAccount(lib.responseData.membership);
      done();
    });

    it('Getting membership by account id', () => {
      return getByAccountIDResponse.then((response) => {
        expect(response).to.have.status(200);
      })
    });
  });

  describe(`\nGET /memberships/organization/{id}\n`, () => {
    before((done) => {
      getByOrgIDResponse = membership.getMembershipByOrganization(lib.responseData.membership);
      done();
    });

    it('Getting membership by organization id', () => {
      return getByOrgIDResponse.then((response) => {
        expect(response).to.have.status(200);
      })
    });
  });

  describe(`\nGET /memberships\n`, () => {
    before((done) => {
      getResponse = membership.getMemberships(lib.responseData.membership);
      done();
    });

    it('List all Memberships', () => {
      return getResponse.then((response) => {
        expect(response).to.have.status(200);
      })
    });
  });
  describe(`\nDELETE /memberships/organization/{organizationId}/account/{accountId}\n`, () => {
    before((done) => {
      deleteResponse = membership.deleteMembershipByAccountAndOrganization(lib.responseData.membership);
      done();
    });

    it('Delete a membership', () => {
      return deleteResponse.then((response) => {
        expect(response).to.have.status(204);
      })
    });
  });
});
