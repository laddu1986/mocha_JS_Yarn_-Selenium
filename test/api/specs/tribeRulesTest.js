import { joi } from 'common';
import * as identity from 'api/actions/identity';
import * as spaces from 'api/actions/spaces';
import * as organization from 'api/actions/organization';
import * as tribe from 'api/actions/tribe';
import * as rules from 'api/actions/tribeRules';

var configResponse,
  saveResponse,
  getResponse,
  evalResponse,
  evalRulesResponse,
  evalFiltersResponse,
  sampleUsersResponse,
  schema;

const rulesData = new Object();

const evalRuleSchema = joi
  .object()
  .keys({
    userCount: joi.number(),
    prevUserCount: joi.number(),
    activeUserCount: joi.number(),
    prevActiveUserCount: joi.number(),
    totalUsers: joi.number()
  })
  .required();

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
        schema = joi.object().keys({
          configuration: joi.object().keys({
            properties: joi.array().items(
              joi.object().keys({
                id: joi
                  .string()
                  .uuid()
                  .required(),
                label: joi.string().required(),
                type: joi.number().required(),
                allowedOperatorIds: joi
                  .array()
                  .items(joi.string().uuid())
                  .required(),
                groupLabel: joi.string().required()
              })
            ),
            operators: joi.array().items(
              joi.object().keys({
                id: joi
                  .string()
                  .uuid()
                  .required(),
                label: joi.string().required(),
                operandType: joi.number(),
                groupLabel: joi.string()
              })
            )
          })
        });

        joi.assert(response.response, schema);
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
        schema = joi.object().keys({
          rule: joi.object().keys({
            audienceType: joi.number(),
            logicalType: joi.number(),
            filters: joi.array().items(
              joi.object().keys({
                filterId: joi.string(),
                value: joi.string(),
                filterIdVal: joi.string().uuid(),
                filterIdIsNull: joi.bool(),
                propertyId: joi.string().uuid(),
                operatorId: joi.string().uuid(),
                intValue: joi.number().integer(),
                stValue: joi.string()
              })
            )
          })
        });
        joi.assert(response.response, schema);
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
        schema = joi.object().keys({
          filterEstimates: joi.array().items(
            joi.object().keys({
              filterId: joi.string(),
              filterIdVal: joi.string().uuid(),
              filterIdIsNull: joi.bool(),
              userCount: joi.number()
            })
          )
        });
        joi.assert(response.response, schema);
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
        schema = evalRuleSchema;
        joi.assert(response.response, schema);
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
        schema = joi.object().keys({
          ruleEstimates: joi
            .array()
            .items(
              joi.object().keys({
                value: joi.string(),
                estimationValue: evalRuleSchema,
                isNull: joi.bool()
              })
            )
            .required()
        });
        joi.assert(response.response, schema);
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
        schema = joi.object().keys({
          userIds: joi.array().items(joi.string())
        });
        joi.assert(response.response, schema);
      });
    });
  });
});
