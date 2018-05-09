import * as lib from '../../common';

function postOrganization(done, responseData) {
  const any = {
    api: lib.config.api.organizations,
    data: { name: lib.bigName(10) },
    func(response) {
      responseData.push(response.body);
      // console.log(responseData);
      expect(response).to.have.status(201);
    }
  };
  lib.post(done, any);
}

function getOrganizationById(done, responseData) {
  const any = {
    api: lib.config.api.organizations,
    data: responseData[0].id,
    func(response) {
    //   lib.res.push(response.body);
      expect(response).to.have.status(200);
    }
  };
  lib.get(done, any);
}

function getOrganizations(done) {
  const any = {
    api: lib.config.api.organizations,
    data: '',
    func(response) {
    //   lib.res.push(response.body);
      expect(response.body).to.be.an('array');
    }
  };
  lib.post(done, any);
}

function postOrganizations(done, responseData) {
  const any = {
    api: lib.config.api.organizations,
    data: [responseData[0], responseData[1]],
    func(response) {
      //   lib.res.push(response.body);
      expect(response.body).to.be.an('array');
      expect(response).to.have.status(200);
    }
  };
  lib.post(done, any);
}

function deleteOrganizationById(done, responseData) {
  const any = {
    api: lib.config.api.organizations,
    data: `${responseData[1].id}?rowVersion=${responseData[1].rowVersion}`,
    func(response) {
      expect(response).to.have.status(204);
    }
  };
  lib.del(done, any);
}

function checkStatusChangedToPendingDelete(done, responseData) {
  const any = {
    api: lib.config.api.organizations,
    data: responseData[1],
    func(response) {
      expect(response.body.rowStatus).to.equal('PendingDelete');
      expect(response).to.have.status(200);
    }
  };
  lib.get(done, any);
}

function putOrganization(done, responseData) {
  const update = responseData[0];
  update.name = 'check update name string';
  //   console.log(update);
  const any = {
    api: lib.config.api.organizations,
    data: update,
    func(response) {
    //   lib.res.push(response.body);
    //   console.log(response.body);
      expect(response).to.have.status(200);
      expect(response.body.id).to.equal(update.id);
      expect(response.body.rowVersion).to.not.equal(update.rowVersion);
    }
  };
  lib.put(done, any);
}

export {
  postOrganization,
  getOrganizationById,
  getOrganizations,
  postOrganizations,
  deleteOrganizationById,
  putOrganization,
  checkStatusChangedToPendingDelete
};
