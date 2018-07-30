import * as lib from '../../common';
import * as mutation from '../actions/mutation';

const responseData = [];
const testData = [{
  data: {
    fields: {
      name: `${lib.randomString.generate(10)}`,
      email: `${lib.randomString.generate(10)}@test.co`,
      password: process.env.ACCOUNT_PASS,
      organizationName: `${lib.randomString.generate(10)}`
    }
  },
  it: 'Adding proper details',
  expected: true
}
  
];
function register(data) {
  it(`${data.it} registerAndCreateOrg`, (done) => {
    mutation.registerAndCreateOrg(done, data, responseData);
    expect(responseData[0]).to.have.status(200);
  });
}
function login(data) {
  it('login', (done) => {
    mutation.login(done, data, responseData);
  });
}
function createOrganization(data) {
  it('create organization', (done) => {
    mutation.createOrganization(done, data, responseData);
  });

}
function updateOrganization(data) {
  it('update organization', (done) => {
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