import * as lib from '../../common';
import * as identity from 'api/actions/identity';
import * as spaces from 'api/actions/spaces';
import * as organization from 'api/actions/organization';
import * as tribe from 'api/actions/tribe';
import * as rules from 'api/actions/tribeRules'

const rulesData = new Object();

describe('Tribe Rules Service', () => {
  describe('saveRule()', () => {
    before('Create a tribe', (done) => {
      identity.postIdentity(rulesData).then(() => {
        return organization.postOrganization(rulesData);
      }).then(() => {
        return spaces.postSpaceByOrganizationId(rulesData);
      }).then(() => {
        return tribe.createTribe(rulesData);
      }).then((response) => {
        saveResponse = rules.saveRule(rulesData);
        done();
      })
    });

    it('Saves a Rule', () => {
      //TODO:
    });
  });
});