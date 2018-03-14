import { chakram } from '../../common';

class Assertions {
  statuscheck200(params) {
    expect(params).to.have.status(204);
    return chakram.wait();
  }
}

export default new Assertions();
