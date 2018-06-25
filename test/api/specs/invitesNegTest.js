import * as lib from '../../common';
import * as identity from 'api/actions/identity';
import * as invites from 'api/actions/invites';
import * as organization from 'api/actions/organization';
const moduleSpecifier = 'api/data/inviteTestsData.js'
var postResponse, getInviteResponse;

describe('Negative Cases --> Invites Api', () => {
    describe('POST /organizations/{id}/invites', () => {
        before((done) => {
            identity.postIdentity(lib.responseData.negInvites).then(() => {
                organization.postOrganization(lib.responseData.negInvites).then(() => {
                    lib.loader.import(moduleSpecifier).then((dataImported) => {
                        postResponse = lib.post(dataImported.default.inviteWithoutAuth);
                        done();
                    });
                });
            });
        });
        it('Create invite without authorization -> 401: Access token is missing or invalid', () => {
            return postResponse.then((response) => {
                expect(response).to.have.status(401);
            });
        });
    });
    describe('GET /invites/{token}', () => {
        before((done) => {
            invites.getAccessToken(lib.responseData.negInvites).then(() => {
                invites.postInvitesByOrganizationId(lib.responseData.negInvites).then(() => {
                    invites.getInvitesByOrganizationId(lib.responseData.negInvites).then(() => {
                        invites.deleteInviteByOrganizationIdAndEmail(lib.responseData.negInvites).then(() => {
                            getInviteResponse = invites.getInviteDetailsByToken(lib.responseData.negInvites);
                            done();
                        });
                    });
                });
            });
        });
        it('Search for deleted invite --> 404: Not Found', () => {
            return getInviteResponse.then((response) => {
                expect(response).to.have.status(404);
            });
        });
    });
});