import * as lib from '../../common';
import * as identity from 'api/actions/identity';
import * as spaces from 'api/actions/spaces';
import * as organization from 'api/actions/organization';
import * as tribe from 'api/actions/tribe';
import * as rules from 'api/actions/tribeRules'
import { getSampleUsers } from '../actions/tribeRules';

var configResponse, saveResponse, getResponse, evalResponse, evalRulesResponse, evalFiltersResponse, sampleUsersResponse, schema;

const rulesData = new Object();

describe.only('Tribe Rules Service', () => {
  describe('getConfiguration()', () => {
    before('Set up the testing environment', (done) => {
      identity.postIdentity(rulesData).then(() => {
        return organization.postOrganization(rulesData);
      }).then(() => {
        return spaces.postSpaceByOrganizationId(rulesData);
      }).then(() => {
        configResponse = rules.getConfiguration(rulesData);
        done();
      })
    });
    
    it('Gets the possible configurations for the space', () => {
      return configResponse.then((response) => {
        var propertiesSchema, operatorsSchema;
        propertiesSchema = lib.joi.object().keys({
          id: lib.joi.string().uuid().required(),
          label: lib.joi.string().required(),
          type: lib.joi.number().required(),
          allowedOperatorIds: lib.joi.array().items(lib.joi.string().uuid()).required(),
          groupLabel: lib.joi.string().required()
        });

        operatorsSchema = lib.joi.object().keys({
          id: lib.joi.string().uuid().required(),
          label: lib.joi.string().required(),
          operandType: lib.joi.number().optional(),
          groupLabel: lib.joi.string().optional()
        });

        schema = lib.joi.object().keys({
          configuration: lib.joi.object().keys({
            properties: lib.joi.array().items(propertiesSchema),
            operators: lib.joi.array().items(operatorsSchema)
          })
        });

        lib.joi.assert(response.response, schema);
      })
    });
  });

  describe('saveRule()', () => {
    before('Save the rule', (done) => {
      tribe.createTribe(rulesData).then(() => {
        saveResponse = rules.saveRule(rulesData);
        done();
      });
    })

    it('The rule is saved', () => {
      return saveResponse.then((response) => {
        expect(response.response.success).to.be.true;
      });
    });
  });

  describe('getRule()', () => {
    before('Get the rule', (done) => {
      getResponse = rules.getRule(rulesData);
      done();
    });

    it('The rule is returned', () => {
      return getResponse.then((response) => {
        schema = lib.joi.object().keys({
          rule: lib.joi.object().keys({
            audienceType: lib.joi.number().optional(),
            logicalType: lib.joi.number().optional(),
            filters: lib.joi.array().optional()
          })
        });
        lib.joi.assert(response.response, schema);
      });
    });
  });

  describe('evaluateFilters()', () => {
    before('Get the filters evaluation', (done) => {
      evalFiltersResponse = rules.evaluateRuleFilters(rulesData);
      done();
    });

    it('Check returned status', () => {
      return evalFiltersResponse.then((response) => {
        expect(response.status.code).to.equal(0);
      });
    });
  });

  //  ---- Rule evaluation will always fail as no data is available on a fresh space ----
  describe.skip('evaluateRule()', () => {
    before('Get the rule evalution', (done) => {
      evalResponse = rules.evaluateRule(rulesData);
      done();
    });

    it('Check returned status', () => {
      return evalResponse.then((response) => {
      });
    });
  });

  describe.skip('evaluateRules()', () => {
    before('Get the rules evaluation', (done) => {
      evalRulesResponse = rules.evaluateRules(rulesData);
      done();
    });

    it('Check returned status', () => {
      return evalRulesResponse.then((response) => {
        console.log(response.response);
      });
    });
  });

  describe.skip('getSampleUsers()', () => {
    before('Get the same users', (done) => {
      sampleUsersResponse = rules.getSampleUsers(rulesData);
    });

    it('Check returned status', () => {
      return sampleUsersResponse.then((response) => {
        expect(response.status.code).to.equal(0);
      })
    });
  });

  // ---- END of failing tests


});