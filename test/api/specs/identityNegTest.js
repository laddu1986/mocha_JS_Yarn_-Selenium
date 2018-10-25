import * as lib from '../common';
import * as data from 'data/identityTestsData.js';
import * as identity from 'actions/identity.js';
import * as validationErrors from 'data/validationErrorsData.json';
var noEmailResponse, noFullNameResponse, noPwdResponse, emailExistsResponse, getResponse, putResponse, patchResponse;
const identityNegData = new Object();

describe('Negative Cases --> Identity Api', () => {
  describe('POST /identities ', () => {
    describe('400 Response - Mandatory fields validation ', () => {
      before(done => {
        noEmailResponse = lib.post(data.noEmail);
        noFullNameResponse = lib.post(data.noFullName);
        noPwdResponse = lib.post(data.noPwd);
        done();
      });

      it('Email cannot be empty', () => {
        return noEmailResponse.then(function(response) {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.email).to.include(data.noEmail.expected);
        });
      });

      it('FullName cannot be emtpy', () => {
        return noFullNameResponse.then(function(response) {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.fullName).to.include(data.noFullName.expected);
        });
      });

      it('Password cannot be empty', () => {
        return noPwdResponse.then(function(response) {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.password).to.include(data.noPwd.expected);
        });
      });
    });
    describe('409 Response - Conflict error for existing email', () => {
      before(done => {
        lib.post(data.existingEmailData).then(() => {
          emailExistsResponse = lib.post(data.existingEmailData);
          done();
        });
      });
      it('Email id already registered', () => {
        return emailExistsResponse.then(function(response) {
          expect(response).to.have.status(409);
          expect(response.body.message).to.equal(data.existingEmailData.expected);
        });
      });
    });
  });
  describe('GET /identities/{id} ', () => {
    describe('404 - Not found validation ', () => {
      before(done => {
        identity.postIdentity(identityNegData).then(() => {
          identity.deleteIdentityById(identityNegData).then(() => {
            getResponse = identity.getIdentityById(identityNegData);
            done();
          });
        });
      });
      it('Search the non-existing user', () => {
        return getResponse.then(function(response) {
          expect(response).to.have.status(404);
          expect(response.body.message).to.include(validationErrors.GetIdentity.UserNotFound);
        });
      });
    });
  });
  describe('PUT /identities/{id}/state ', () => {
    before(done => {
      putResponse = identity.putIdentityById(identityNegData);
      done();
    });
    it('400 - Invalid userState entered ', () => {
      return putResponse.then(function(response) {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal(validationErrors.SetIdentity.InvalidIdentity);
      });
    });
  });
  describe('PATCH /identities/{id}/state ', () => {
    before(done => {
      patchResponse = identity.patchIdentityStateById(identityNegData);
      done();
    });
    it('400 - Invalid userState entered ', () => {
      return patchResponse.then(function(response) {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal(validationErrors.SetIdentity.InvalidIdentity);
      });
    });
  });
});
