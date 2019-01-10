import { joi } from '../common';
import * as identity from 'actions/identity';
import * as spaces from 'actions/spaces';
import * as organization from 'actions/organization';
import * as tribe from 'actions/tribe';
import * as rules from 'actions/tribeRules';
import * as schemas from 'schemas/tribeRulesSchema';

const rulesData = new Object();

describe.only('Tribe Rules Service', () => {
  before('Set up the testing environment', async () => {
    await identity.postIdentity(rulesData);
    await organization.postOrganization(rulesData);
    await spaces.postSpaceByOrganizationId(rulesData);
    await tribe.createTribe(rulesData);
  });

  it('getConfiguration()', async () => {
    let configResponse = await rules.getConfiguration(rulesData);
    expect(configResponse.status.code).to.equal(0);
    joi.assert(configResponse.response, schemas.Configuration);
  })

  xit('saveRule()', async () => {
    let saveResponse = await rules.saveRule(rulesData);

  });

  xdescribe('saveRule()', () => {
    before('Save the rule', async () => {
      
      saveResponse = await rules.saveRule(rulesData);
    });

    it('The rule is saved', () => {
      expect(saveResponse.status.code).to.equal(0);
      expect(saveResponse.response.success).to.be.true;
    });
  });

  xdescribe('getRule()', () => {
    before('Get the rule', async () => {
      getResponse = await rules.getRule(rulesData);
    });

    it('The rule is returned', () => {
      joi.assert(getResponse.response, schemas.Rule);
    });
  });

  xdescribe('evaluateRuleFilters()', () => {
    before('Get the filters evaluation', async () => {
      evalFiltersResponse = await rules.evaluateRuleFilters(rulesData);
    });

    it('Check returned status', () => {
      expect(evalFiltersResponse.status.code).to.equal(0);
      joi.assert(evalFiltersResponse.response, schemas.EvaluateFilters);
    });
  });

  xdescribe('evaluateRule()', () => {
    before('Get the rule evalution', async () => {
      evalResponse = await rules.evaluateRule(rulesData);
    });

    it('Check returned status', () => {
      expect(evalResponse.status.code).to.equal(0);
      joi.assert(evalResponse.response, schemas.EvaluateRule);
    });
  });

  xdescribe('evaluateRules()', () => {
    before('Get the rules evaluation', async () => {
      evalRulesResponse = await rules.evaluateRules(rulesData);
    });

    it('Check returned status', () => {
      expect(evalRulesResponse.status.code).to.equal(0);
      joi.assert(evalRulesResponse.response, schemas.EvaluateRules);
    });
  });

  xdescribe('getSampleUsers()', () => {
    before('Get the same users', async () => {
      sampleUsersResponse = await rules.getSampleUsers(rulesData);
    });

    it('Check returned status', () => {
      expect(sampleUsersResponse.status.code).to.equal(0);
      joi.assert(sampleUsersResponse.response, schemas.SampleUsers);
    });
  });
});
