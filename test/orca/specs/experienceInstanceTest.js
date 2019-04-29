import '../common';
import { registerAndCreateOrg, login, CONTEXT } from 'actions/common';
import { getOrganizations } from 'actions/organization';
import { createSpace } from 'actions/space';
import * as templates from 'actions/experienceTemplate';

var templateData = {};

describe.only('Experience Instance Tests', () => {
  before('Setup the testing environment', async () => {
    await registerAndCreateOrg(templateData);
    await login(templateData);
    await getOrganizations(templateData);
    await createSpace(templateData);
    CONTEXT = templateData;
    console.log(CONTEXT.spaceId);
  });
  it('', () => {
    //console.log(CONTEXT.context)
  });
});
