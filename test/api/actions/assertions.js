import { chakram } from '/Users/avinash.eediga/Documents/appcurator/qa-automation/test/common.js';

class Assertions {
  statuscheck200(params) {
    expect(params).to.have.status(204);
    return chakram.wait();
  }
}

export default new Assertions();
