import { joi } from '../common';
import * as identity from 'actions/identity';
import * as spaces from 'actions/spaces';
import * as organization from 'actions/organization';
import * as tribe from 'actions/tribe';
import * as rules from 'actions/tribeRules';
import * as schemas from 'schemas/tribeRulesSchema';

var configResponse,
  saveResponse,
  getResponse,
  evalResponse,
  evalRulesResponse,
  evalFiltersResponse,
  sampleUsersResponse;

const rulesData = new Object();

describe('Tribe Rules Service', () => {
  describe('getConfiguration()', () => {
    before('Set up the testing environment', done => {
      identity
        .postIdentity(rulesData)
        .then(() => {
          return organization.postOrganization(rulesData);
        })
        .then(() => {
          return spaces.postSpaceByOrganizationId(rulesData);
        })
        .then(() => {
          configResponse = rules.getConfiguration(rulesData);
          done();
        });
    });

    it('Gets the possible configurations for the space', () => {
      return configResponse.then(response => {
        expect(response.status.code).to.equal(0);
        joi.assert(response.response, schemas.Configuration);
      });
    });

    it('Verifies the configuration properties', () => {
      return configResponse.then(response => {
        rules.expectConfig(response.response.configuration.properties, true);
        expect(rules.ActualFilters).to.deep.equal(rules.ExpectedFilters);
      });
    });

    it('Verifies the configuration operators', () => {
      return configResponse.then(response => {
        rules.expectConfig(response.response.configuration.operators, false);
        expect(rules.ActualFilters).to.include.members(rules.ExpectedFilters);
      });
    });
  });

  describe('saveRule()', () => {
    before('Save the rule', done => {
      tribe.createTribe(rulesData).then(() => {
        saveResponse = rules.saveRule(rulesData);
        done();
      });
    });

    it('The rule is saved', () => {
      return saveResponse.then(response => {
        expect(response.status.code).to.equal(0);
        expect(response.response.success).to.be.true;
      });
    });
  });

  describe('getRule()', () => {
    before('Get the rule', done => {
      getResponse = rules.getRule(rulesData);
      done();
    });

    it('The rule is returned', () => {
      return getResponse.then(response => {
        joi.assert(response.response, schemas.Rule);
      });
    });
  });

  describe('evaluateRuleFilters()', () => {
    before('Get the filters evaluation', done => {
      evalFiltersResponse = rules.evaluateRuleFilters(rulesData);
      done();
    });

    it('Check returned status', () => {
      return evalFiltersResponse.then(response => {
        expect(response.status.code).to.equal(0);
        joi.assert(response.response, schemas.EvaluateFilters);
      });
    });
  });

  describe('evaluateRule()', () => {
    before('Get the rule evalution', done => {
      evalResponse = rules.evaluateRule(rulesData);
      done();
    });

    it('Check returned status', () => {
      return evalResponse.then(response => {
        expect(response.status.code).to.equal(0);
        joi.assert(response.response, schemas.EvaluateRule);
      });
    });
  });

  describe('evaluateRules()', () => {
    before('Get the rules evaluation', done => {
      evalRulesResponse = rules.evaluateRules(rulesData);
      done();
    });

    it('Check returned status', () => {
      return evalRulesResponse.then(response => {
        expect(response.status.code).to.equal(0);
        joi.assert(response.response, schemas.EvaluateRules);
      });
    });
  });

  describe('getSampleUsers()', () => {
    before('Get the same users', done => {
      sampleUsersResponse = rules.getSampleUsers(rulesData);
      done();
    });

    it('Check returned status', () => {
      return sampleUsersResponse.then(response => {
        expect(response.status.code).to.equal(0);
        joi.assert(response.response, schemas.SampleUsers);
      });
    });
  });
});
