import * as identity from '../actions/identity';
import * as lib from '../../common';
import * as organization from 'api/actions/organization';
import * as membership from 'api/actions/membership';
import * as validationErrorsData from 'api/data/validationErrorsData.json';

var getResponse, deleteResponse, postResponse;

describe('Negative tests-> Membership', () => {
  describe(`\nSearch Non Existing Membership\n`, () => {
    before((done) => {
      identity.postIdentity(lib.responseData.negMembership).then(() => {
        organization.postOrganization(lib.responseData.negMembership).then(() => {
          membership.postMembership(lib.responseData.negMembership).then(() => {
            membership.deleteMembershipByAccountAndOrganization(lib.responseData.negMembership).then(() => {
              getResponse = membership.getMembershipByAccount(lib.responseData.negMembership);
              done();
            })
          })
        })
      })
    });

    it('Should return 0 rows', () => {
      return getResponse.then((response) => {
        expect(response.body.totalRows).to.deep.equal(0);
      })
    });
  });

  describe(`\nDelete Membership when Account is Non Existing \n`, () => {
    before((done) => {
      identity.deleteIdentityById(lib.responseData.negMembership).then(() => {
        deleteResponse = membership.deleteMembershipByAccountAndOrganization(lib.responseData.negMembership);
        done();
      })
    })
    it('Should return 404 response', () => {
      return deleteResponse.then((response) => {
        expect(response).to.have.status(404);
      })
    });
  });

  describe(`\nCreate Membership when organization is Non Existing \n`, () => {
    before((done) => {
      postResponse = membership.postMembershipWithBlankOrgID(lib.responseData.negMembership);
      done();
    })

    it('Should return 400 response', () => {
      return postResponse.then((response) => {
        expect(response).to.have.status(400);
        expect(response.body.validationErrors.organizationId).to.equal(validationErrorsData.CreateMembership.BlankOrgIDError);
      })
    });
  })
});
