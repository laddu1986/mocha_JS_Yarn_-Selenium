import { post, put, get, del } from '../../common';
import * as identity from 'actions/identity';
import * as organization from 'actions/organization';
import * as data from 'data/organizationTestsData';

const orgNegData = new Object();

describe('Negative Tests --> Organizations API', () => {
  before(async () => {
    await identity.postIdentity(orgNegData);
    await organization.postOrganization(orgNegData);
  });
  it('C1295546 POST /organizations with no name should return 400', async () => {
    let noNamePostResponse = await post(data.noName(orgNegData));
    expect(noNamePostResponse).to.have.status(400);
    expect(noNamePostResponse.body.validationErrors.name).to.equal(data.noName(orgNegData).expected);
  });
  xit('C1295547 POST /organizations with no CreatedByAccountId should return 400', async () => {
    // to be enabled when ACF-212 is fixed
    let noIDPostResponse = await post(data.blankAccountId);
    expect(noIDPostResponse).to.have.status(400);
    expect(noIDPostResponse.body.validationErrors.name).to.equal(data.blankAccountId.expected);
  });
  it('C1295548 PUT /organizations with an out of date RowVersion should return 409', async () => {
    let noRowVersionPutResponse = await put(data.blankRowVersion(orgNegData));
    expect(noRowVersionPutResponse).to.have.status(409);
    expect(noRowVersionPutResponse.body).to.equal(data.blankRowVersion(orgNegData).expected);
  });
  it('C1295549 PUT /organizations with a blank name should return 400', async () => {
    let blankNamePutResponse = await put(data.blankName(orgNegData));
    expect(blankNamePutResponse).to.have.status(400);
    expect(blankNamePutResponse.body.validationErrors.name).to.equal(data.blankName(orgNegData).expected);
  });
  it('C1295550 PUT /organizations with a blank ID should return 400', async () => {
    let blankIDPutResponse = await put(data.blankID(orgNegData));
    expect(blankIDPutResponse).to.have.status(400);
    expect(blankIDPutResponse.body.validationErrors.id).to.equal(data.blankID(orgNegData).expected);
  });
  it('C1295551 PUT /organizations with a non-existant Org ID should return 404', async () => {
    let incorrectIDPutResponse = await put(data.incorrectOrgIDPut(orgNegData));
    expect(incorrectIDPutResponse).to.have.status(404);
  });
  it('C1295552 GET /organizations/{id} with a non-existant Org ID should return 404', async () => {
    let getResponse = await get(data.incorrrectOrgIDGet(orgNegData));
    expect(getResponse).to.have.status(404);
  });
  it('C1295553 DELETE /organizations/{id} with a non-existant Org ID should return 409', async () => {
    let incorrectOrgIDDeleteResponse = await del(data.incorrectOrgIDDelete(orgNegData));
    expect(incorrectOrgIDDeleteResponse).to.have.status(409);
    expect(incorrectOrgIDDeleteResponse.body).to.equal(data.incorrectOrgIDDelete(orgNegData).expected);
  });
  it('C1295554 DELETE /organizations/{id} with a blank Org ID should return 404', async () => {
    let blankOrgIdDeleteResponse = await del(data.blankOrgIdDelete);
    expect(blankOrgIdDeleteResponse).to.have.status(404);
  });
  after(async () => {
    await identity.deleteIdentityById(orgNegData);
    await organization.deleteOrganizationById(orgNegData);
  });
});
