import { joi, Tags } from '../common';
import * as identity from 'actions/identity';
import * as organization from 'actions/organization';
import * as schemas from 'schemas/organizationSchema';

const orgData = new Object();

describe('Organizations API', () => {
  before(async () => {
    await identity.postIdentity(orgData);
  });

  it(`C1295555 POST /organizations ${Tags.smokeTest} creates a new organization`, async () => {
    let createOrgResponse = await organization.postOrganization(orgData, true);
    expect(createOrgResponse).to.have.status(201);
    joi.assert(createOrgResponse.body, schemas.createOrgSchema(orgData));
  });

  // TODO: https://app.clickup.com/t/d01q8
  xit('C1295556 GET /organizations lists all organizations', async () => {
    let listOrgResponse = await organization.getOrganizations();
    expect(listOrgResponse.body).to.be.an('array');
    expect(listOrgResponse).to.have.status(200);
  });

  it('C1295557 GET /organizations/{id} returns an organization by its id', async () => {
    let getOrgResponse = await organization.getOrganizationById(orgData);
    expect(getOrgResponse).to.have.status(200);
    joi.assert(getOrgResponse.body, schemas.getOrganizationByIdSchema(orgData));
  });

  it('C1295558 POST /organizations/list lists organizations by their id', async () => {
    let listOrgsByIDResponse = await organization.postOrganizations(orgData);
    expect(listOrgsByIDResponse.body).to.be.an('array');
    expect(listOrgsByIDResponse).to.have.status(200);
    joi.assert(listOrgsByIDResponse.body, schemas.postOrganizationsSchema(orgData));
  });

  it('C1295559 PUT /organization updates an existing organization', async () => {
    let updateResponse = await organization.putOrganization(orgData, true);
    expect(updateResponse).to.have.status(200);
    expect(updateResponse.body.name).to.equal('check update name string');
    joi.assert(updateResponse.body, schemas.putOrgSchema(orgData));
  });

  it('C1295560 DELETE /organizations/{id} deletes an organization by its id', async () => {
    let deleteResponse = await organization.deleteOrganizationById(orgData);
    expect(deleteResponse).to.have.status(204);
  });

  after(async () => {
    await identity.deleteIdentityById(orgData);
  });
});
