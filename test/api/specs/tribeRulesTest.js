import { joi } from '../common';
import * as identity from 'actions/identity';
import * as spaces from 'actions/spaces';
import * as organization from 'actions/organization';
import * as tribe from 'actions/tribe';
import * as rules from 'actions/tribeRules';
import * as schemas from 'schemas/tribeRulesSchema';

const rulesData = new Object();

describe('Tribe Rules Service', () => {
  before('Set up the testing environment', async () => {
    await identity.postIdentity(rulesData);
    await organization.postOrganization(rulesData);
    await spaces.postSpaceByOrganizationId(rulesData);
    await tribe.createTribe(rulesData);
  });

  it('C1295615 getConfiguration()', async () => {
    let configResponse = await rules.getConfiguration(rulesData);
    expect(configResponse.status.code).to.equal(0);
    joi.assert(configResponse.response, schemas.getConfiguration);
  });

  it('C1295618 saveRule()', async () => {
    let saveResponse = await rules.saveRule(rulesData);
    expect(saveResponse.status.code).to.equal(0);
    joi.assert(saveResponse.response, schemas.saveRule(rulesData));
  });

  it('C1295619 getRule()', async () => {
    let getResponse = await rules.getRule(rulesData);
    expect(getResponse.status.code).to.equal(0);
    joi.assert(getResponse.response, schemas.getRule(rulesData));
  });

  it('C1295620 evalutateRuleFilters()', async () => {
    let evalFiltersResponse = await rules.evaluateRuleFilters(rulesData);
    expect(evalFiltersResponse.status.code).to.equal(0);
    joi.assert(evalFiltersResponse.response, schemas.evaluateRuleFilters);
  });

  it('C1295621 evaluateRule()', async () => {
    let evaluateRuleResponse = await rules.evaluateRule(rulesData);
    expect(evaluateRuleResponse.status.code).to.equal(0);
    joi.assert(evaluateRuleResponse.response, schemas.evaluateRule);
  });

  it('C1295622 evaluateRules()', async () => {
    let evaluateRulesResponse = await rules.evaluateRules(rulesData);
    expect(evaluateRulesResponse.status.code).to.equal(0);
    joi.assert(evaluateRulesResponse.response, schemas.evaluateRules);
  });

  it('C1295623 getSampleUsers()', async () => {
    let getSampleUsersResponse = await rules.getSampleUsers(rulesData);
    expect(getSampleUsersResponse.status.code).to.equal(0);
    joi.assert(getSampleUsersResponse.response, schemas.sampleUsers);
  });
});
