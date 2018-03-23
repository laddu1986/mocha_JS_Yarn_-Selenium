import * as lib from '../../common';

// const fullname = lib.faker.name.findName();
// const email = lib.faker.internet.email();
// const password = lib.faker.internet.password();
const res = [];
const postRes = [];

describe('Identities Api', () => {
  before('Connect to database', () => {
    // lib.connection({
    //   host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
    //   user: 'rouser',
    //   password: 'R34d0nlyK3y',
    //   database: 'membership_test',
    // });
  });
  describe('POST /identities ', () => {
    it('Add a new user identity.', () => lib.server
      .post(
        lib.config.api.identities,
        {
          fullname: lib.faker.name.findName(),
          email: lib.faker.internet.email(),
          password: lib.faker.internet.password(),
        },
      )
      .then((i) => {
        // res = [];
        postRes.push(i.body);
        expect(i).to.have.status(201);
      }));
  });
  describe('GET /identities/{id}', () => {
    it('Get a identity by its id.', () => lib.server
      .post(
        lib.config.api.identities,
        {
          fullname: lib.faker.name.findName(),
          email: lib.faker.internet.email(),
          password: lib.faker.internet.password(),
        },
      )
      .then((i) => {
        // console.log(i.body);
        res.push(i.body);
        expect(i).to.have.status(201);
        // console.log("::: ::: :::");
        // console.log("::: ::: :::");
        return lib.server.get(lib.config.api.identities + res[0].id)
          .then((o) => {
            res.push(o.body);
            expect(o).to.have.status(200);
            // console.log(o.body);
          });
      }));
  });
  describe('GET /identities/{id}/state', () => {
    it('Get identity state by its id.', () => lib.server
      .get(`${lib.config.api.identities + res[0].id}/state`)
      .then((i) => {
        // console.log(i.body);
        expect(o).to.have.status(200);
      }));
  });

  describe('PUT /identities/{id}/state', () => {
    it('Update identity state by its id.', () => lib.server
      .get(`${lib.config.api.identities + res[0].id}/state`)
      .then((i) => {
        // console.log(i.body);
        expect(o).to.have.status(204);
      }));
  });

  after('End message', () => {
    // lib.end();
  });
});
