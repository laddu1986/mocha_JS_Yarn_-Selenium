import * as lib from '../common';
import * as data from 'data/identityTestsData.js';
import * as identity from 'actions/identity.js';
import * as validationErrors from 'data/validationErrorsData.json';
var noEmailResponse, noFullNameResponse, noPwdResponse, emailExistsResponse, getResponse, putResponse, patchResponse;
const identityNegData = new Object();

describe('Negative Cases --> Identity Api', () => {
  describe('POST /identities ', () => {
    describe('400 Response - Mandatory fields validation ', () => {
      before(async () => {
        noEmailResponse = await lib.post(data.noEmail);
        noFullNameResponse = await lib.post(data.noFullName);
        noPwdResponse = await lib.post(data.noPwd);
      });

      it('Email cannot be empty', () => {
        expect(noEmailResponse).to.have.status(400);
        expect(noEmailResponse.body.validationErrors.email).to.include(data.noEmail.expected);
      });

      it('FullName cannot be emtpy', () => {
        expect(noFullNameResponse).to.have.status(400);
        expect(noFullNameResponse.body.validationErrors.fullName).to.include(data.noFullName.expected);
      });

      it('Password cannot be empty', () => {
        expect(noPwdResponse).to.have.status(400);
        expect(noPwdResponse.body.validationErrors.password).to.include(data.noPwd.expected);
      });
    });

    describe('409 Response - Conflict error for existing email', () => {
      before(async () => {
        await lib.post(data.existingEmailData);
        emailExistsResponse = await lib.post(data.existingEmailData);
      });
      it('Email id already registered', () => {
        expect(emailExistsResponse).to.have.status(409);
        expect(emailExistsResponse.body.message).to.equal(data.existingEmailData.expected);
      });
    });
  });
  describe('GET /identities/{id} ', () => {
    describe('404 - Not found validation ', () => {
      before(async () => {
        await identity.postIdentity(identityNegData);
        await identity.deleteIdentityById(identityNegData);
        getResponse = await identity.getIdentityById(identityNegData, 'negative');
      });
      it('Search the non-existing user', () => {
        expect(getResponse).to.have.status(404);
        expect(getResponse.body.message).to.include(validationErrors.GetIdentity.UserNotFound);
      });
    });
  });
  describe('PUT /identities/{id}/state ', () => {
    before(async () => {
      putResponse = await identity.putIdentityById(identityNegData, 'negative');
    });
    it('400 - Invalid userState entered ', () => {
      expect(putResponse).to.have.status(400);
      expect(putResponse.body.message).to.equal(validationErrors.SetIdentity.InvalidIdentity);
    });
  });
  describe('PATCH /identities/{id}/state ', () => {
    before(async () => {
      patchResponse = await identity.patchIdentityStateById(identityNegData, 'negative');
    });
    it('400 - Invalid userState entered ', () => {
      expect(patchResponse).to.have.status(400);
      expect(patchResponse.body.message).to.equal(validationErrors.SetIdentity.InvalidIdentity);
    });
  });
});
