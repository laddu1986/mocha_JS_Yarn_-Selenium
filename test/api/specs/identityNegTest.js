import * as lib from '../common';
import * as data from 'data/identityTestsData.js';
import * as identity from 'actions/identity.js';
import * as validationErrors from 'data/validationErrorsData.json';

const identityNegData = new Object();

describe('Negative Cases --> Identity API', () => {
  before(async () => {
    await identity.postIdentity(identityNegData);
  });
  it('C1295516 POST /identities with an existing email returns 409', async () => {
    let emailExistsResponse = await lib.post(data.existingEmailData(identityNegData));
    expect(emailExistsResponse).to.have.status(409);
    expect(emailExistsResponse.body.message).to.equal(data.existingEmailData(identityNegData).expected);
  });
  it('C1295517 GET /identities/{id} with a non-existant user returns 404', async () => {
    await identity.deleteIdentityById(identityNegData);
    let getResponse = await identity.getIdentityById(identityNegData, 'negative');
    expect(getResponse).to.have.status(404);
    expect(getResponse.body.message).to.include(validationErrors.GetIdentity.UserNotFound);
  });
  it('C1295513 POST /identities with an empty email returns 400', async () => {
    let noEmailResponse = await lib.post(data.noEmail);
    expect(noEmailResponse).to.have.status(400);
    expect(noEmailResponse.body.validationErrors.email).to.include(data.noEmail.expected);
  });
  it('C1295514 POST /identities with an empty fullname returns 400', async () => {
    let noFullNameResponse = await lib.post(data.noFullName);
    expect(noFullNameResponse).to.have.status(400);
    expect(noFullNameResponse.body.validationErrors.fullName).to.include(data.noFullName.expected);
  });
  it('C1295515 POST /identities with an empty password returns 400', async () => {
    let noPwdResponse = await lib.post(data.noPwd);
    expect(noPwdResponse).to.have.status(400);
    expect(noPwdResponse.body.validationErrors.password).to.include(data.noPwd.expected);
  });
  it('C1295518 PUT /identities/{id}/state with an invalid user state returns 400', async () => {
    let putResponse = await identity.putIdentityById(identityNegData, 'negative');
    expect(putResponse).to.have.status(400);
    expect(putResponse.body.message).to.equal(validationErrors.SetIdentity.InvalidIdentity);
  });
  it('C1295519 PATCH /identities/{id}/state with an invalid user state returns 400', async () => {
    let patchResponse = await identity.patchIdentityStateById(identityNegData, 'negative');
    expect(patchResponse).to.have.status(400);
    expect(patchResponse.body.message).to.equal(validationErrors.SetIdentity.InvalidIdentity);
  });
});
