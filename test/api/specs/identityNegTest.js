import * as lib from '../../common';
import * as data from 'api/data/identityTestsData.js';
import * as identity from 'api/actions/identity.js';
import * as validationErrors from 'api/data/validationErrorsData.json';
var noEmailResponse, noFullNameResponse, noPwdResponse, emailExistsResponse, getResponse;

describe('Identity Api - Negative Cases', () => {
    describe('POST /identities ', () => {
        describe('400 Response - Mandatory fields validation ', () => {
            before((done) => {
                noEmailResponse = lib.post(data.noEmail);
                noFullNameResponse = lib.post(data.noFullName);
                noPwdResponse = lib.post(data.noPwd);
                done();
            });

            it('Email cannot be empty', () => {
                return noEmailResponse.then(function (response) {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.email).to.include(data.noEmail.expected);
                });
            });

            it('FullName cannot be emtpy', () => {
                return noFullNameResponse.then(function (response) {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.fullName).to.include(data.noFullName.expected);
                });
            });

            it('Password cannot be empty', () => {
                return noPwdResponse.then(function (response) {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.password).to.include(data.noPwd.expected);
                });
            });
        });
        describe('409 Response - Conflict error for existing email', () => {
            before((done) => {
                lib.post(data.existingEmailData).then(() => {
                    emailExistsResponse = lib.post(data.existingEmailData);
                    done();
                });
            });
            it('Email id already registered', () => {
                return emailExistsResponse.then(function (response) {
                    expect(response).to.have.status(409);
                    expect(response.body.message).to.equal(data.existingEmailData.expected);
                });
            });
        });
    });
    describe('GET /identities/{id} ', () => {
        describe('404 - Not found validation ', () => {
            before((done) => {
                identity.postIdentity(lib.responseData.negIdentity).then(() => {
                    identity.deleteIdentityById(lib.responseData.negIdentity).then(() => {
                        getResponse = identity.getIdentityById(lib.responseData.negIdentity);
                        done();
                    })
                })
            })
            it('Search the non-existing user', () => {
                return getResponse.then(function (response) {
                    expect(response).to.have.status(404);
                    expect(response.body.message).to.include(validationErrors.GetIdentity.UserNotFound);
                });
            });
        });
    });
});