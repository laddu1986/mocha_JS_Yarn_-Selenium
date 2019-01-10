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

  it('getConfiguration()', async () => {
    let configResponse = await rules.getConfiguration(rulesData);
    expect(configResponse.status.code).to.equal(0);
    joi.assert(configResponse.response, schemas.getConfiguration);
  });

  it('saveRule()', async () => {
    let saveResponse = await rules.saveRule(rulesData);
    expect(saveResponse.status.code).to.equal(0);
    joi.assert(saveResponse.response, schemas.saveRule(rulesData));
  });

  it('getRule()', async () => {
    let getResponse = await rules.getRule(rulesData);
    expect(getResponse.status.code).to.equal(0);
    joi.assert(getResponse.response, schemas.getRule(rulesData));
  });

  it('evalutateRuleFilters()', async () => {
    let evalFiltersResponse = await rules.evaluateRuleFilters(rulesData);
    expect(evalFiltersResponse.status.code).to.equal(0);
    joi.assert(evalFiltersResponse.response, schemas.evaluateRuleFilters);
  });

  it('evaluateRule()', async () => {
    let evaluateRuleResponse = await rules.evaluateRule(rulesData);
    expect(evaluateRuleResponse.status.code).to.equal(0);
    joi.assert(evaluateRuleResponse.response, schemas.evaluateRule);
  });

  it('evaluateRules()', async () => {
    let evaluateRulesResponse = await rules.evaluateRules(rulesData);
    expect(evaluateRulesResponse.status.code).to.equal(0);
    joi.assert(evaluateRulesResponse.response, schemas.evaluateRules);
  });

  it('getSampleUsers()', async () => {
    let getSampleUsersResponse = await rules.getSampleUsers(rulesData);
    expect(getSampleUsersResponse.status.code).to.equal(0);
    joi.assert(getSampleUsersResponse.response, schemas.sampleUsers);
  });
});
