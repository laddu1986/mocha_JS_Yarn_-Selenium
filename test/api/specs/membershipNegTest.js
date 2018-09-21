import * as identity from '../actions/identity';
import * as lib from '../../common';
import * as organization from 'api/actions/organization';
import * as membership from 'api/actions/membership';
const moduleSpecifier = 'api/data/membershipTestsData';
var expectedMessageForBlankOrgId, expectedMessageForinvalidToken, getResponse, deleteResponse, blankOrgIdResponse, invalidTokenResponse;

describe('Negative tests --> Membership', () => {
  describe('GET /memberships', () => {
    before((done) => {
      identity.postIdentity(lib.membershipNegData).then(() => {
        organization.postOrganization(lib.membershipNegData).then(() => {
          membership.postMembership(lib.membershipNegData).then(() => {
            membership.deleteMembershipByAccountAndOrganization(lib.membershipNegData).then(() => {
              getResponse = membership.getMembershipByAccount(lib.membershipNegData);
              done();
            })
          })
        })
      })
    });
    it('Non existing membership -> Should return 0 rows', () => {
      return getResponse.then((response) => {
        expect(response.body.totalRows).to.deep.equal(0);
      })
    });
  });
  describe('POST /memberships ', () => {
    before((done) => {
      lib.loader.import(moduleSpecifier).then((dataImported) => {
        blankOrgIdResponse = lib.post(dataImported.default.blankOrgId);
        invalidTokenResponse = lib.post(dataImported.default.invalidToken);
        expectedMessageForBlankOrgId = dataImported.default.blankOrgId.expected;
        expectedMessageForinvalidToken = dataImported.default.invalidToken.expected;
        done();
      })
    })
    it('Invalid OrgID --> Should return 400 response', () => {
      return blankOrgIdResponse.then((response) => {
        expect(response).to.have.status(400);
        expect(response.body.validationErrors.organizationId).to.equal(expectedMessageForBlankOrgId);
      })
    });
    it('Invalid token --> Should return 404 response', () => {
      return invalidTokenResponse.then((response) => {
        expect(response).to.have.status(404);
        expect(response.body.validationErrors.InviteToken).to.equal(expectedMessageForinvalidToken);
      })
    });
  })
  describe('Delete Membership when Account is Non Existing ', () => {
    before((done) => {
      identity.deleteIdentityById(lib.membershipNegData).then(() => {
        deleteResponse = membership.deleteMembershipByAccountAndOrganization(lib.membershipNegData);
        done();
      })
    })
    it('Should return 404 response', () => {
      return deleteResponse.then((response) => {
        expect(response).to.have.status(404);
      })
    });
  });
});

