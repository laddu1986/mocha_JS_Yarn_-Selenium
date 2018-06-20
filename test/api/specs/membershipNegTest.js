import * as identity from '../actions/identity';
import * as lib from '../../common';
import * as organization from 'api/actions/organization';
import * as membership from 'api/actions/membership';
const moduleSpecifier = 'api/data/membershipTestsData';
var NodeESModuleLoader = require('node-es-module-loader');
var loader = new NodeESModuleLoader();
var expectedMessageForBlankOrgId, expectedMessageForinvalidToken, getResponse, deleteResponse, blankOrgIdResponse, invalidTokenResponse;

describe('Negative tests-> Membership', () => {
  describe(`\nGET /memberships\n`, () => {
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
    it('Non existing membership -> Should return 0 rows', () => {
      return getResponse.then((response) => {
        expect(response.body.totalRows).to.deep.equal(0);
      })
    });
  });
  describe(`\nPOST /memberships \n`, () => {
    before((done) => {
      loader.import(moduleSpecifier).then((dataImported) => {
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
});

