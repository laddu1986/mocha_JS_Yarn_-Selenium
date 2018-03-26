import * as lib from '../../common';

class Assertions {
  statuscheck200(params) {
    expect(params).to.have.status(204);
    return lib.chakram.wait();
  }
}

export default new Assertions();
