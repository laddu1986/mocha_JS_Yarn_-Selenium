import * as lib from '../../common';
import * as mutation from '../actions/mutation';

const responseData = [];
const testData = [{
  data: {
    fields: {
      name: `${lib.bigName(10)}`,
      email: `${lib.bigName(10)}@test.co`,
      password: 'Pass1234',
      organizationName: `${lib.bigName(10)}`,
    },
  },
  it: 'Adding proper details',
  expected: true,
},
//  {
//   data: {
//     fields: {
//       name: `${lib.bigName(10)}`,
//       email: `${lib.bigName(10)}@test.co`,
//       password: 'Pass1234',
//       organizationName: `${lib.bigName(10)}`,
//     },
//   },
//   it: 'Adding wrong details data',
//   expected: false,
// },
];
function register(data) {
  it(`${data.it} registerAndCreateOrg`, (done) => {
    mutation.registerAndCreateOrg(done, data, responseData);
  });
}
function login(data) {
  it('login', (done) => {
    mutation.login(done, data, responseData);
  });
}
function createOrganization(data) {
  // setTimeout((done) => {
    it(`create organization`, (done) => {
      mutation.createOrganization(done, data, responseData);
    });
  // }, 2);
  
}
function updateOrganization(data) {
    it(`update organization`, (done) => {
      mutation.updateOrganization(done, data, responseData);
    });  
}

describe('Mutation registerAndCreateOrg ', () => {
  testData.map(data => register(data));
});
describe('Mutation login ', () => {
  testData.map(data => login(data));
});
describe('Mutation organization', () => {
  testData.map(data => createOrganization(data));
  testData.map(data => updateOrganization(data));
});

