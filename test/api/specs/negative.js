import * as lib from '../../common';

const fullname = lib.faker.name.findName();
const email = lib.faker.internet.email();
const password = lib.faker.internet.password();
const res = [];

const idata = {
  fullname,
  email,
  password
};
const odata = {
  name: fullname
};

lib.connection({
  host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
  user: 'rouser',
  password: 'R34d0nlyK3y',
  database: 'membership_test'
});

lib.connection().query('select * from Memberships', (error, results) => {
  if (error) throw error;
  console.log('The solution is: ', results[0].Id);
});

lib.end();

describe('Memberships', () => {
  it('deleteamembership', () => lib.chakram.post(lib.config.api.identities, idata)
    .then((i) => {
      res.push(i.body);
      // console.log("::: ::: :::");
      // console.log(i.body);
      // console.log("::: ::: :::");
      return lib.chakram.post(lib.config.api.organizations, odata)
        .then((o) => {
          res.push(o.body);
          // console.log(o.body);
          // console.log("::: ::: :::");
          // console.log(res[0].firstName+"::: ::: :::"+res[1].name);
          const m = {
            identityId: res[0].id,
            firstName: res[0].fullname,
            lastName: res[0].fullname,
            organizationId: res[1].id,
            organizationName: res[1].name
          };
          return lib.chakram.post(lib.config.api.memberships, m)
            .then((mR) => {
              console.log(mR.body);
              res.push(mR.body);
              return lib.chakram.delete(lib.config.api.memberships + res[2].id);
            });
        });
    }));

  it('should have a 404 response status', () => {
    const response = lib.chakram.get(lib.config.api.memberships + res[2].id);
    expect(response).to.have.status(404);
    return lib.chakram.wait();
  });
  it('should have a 404 response status', (done) => {
    const response = lib.chakram.get(lib.config.api.memberships + res[2].id);
    response.then((result) => {
      try {
        expect(result).not.to.have.status(404);
        done();
      } catch (e) {
        done(e);
      }
    });
    return lib.chakram.wait();
  });
});
