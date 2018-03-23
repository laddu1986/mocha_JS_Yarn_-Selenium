<<<<<<< HEAD
import * as lib from '../../common';
=======
import { chakram } from '../../common';
>>>>>>> 0d0d9f47265e965904031d8f79bde1953bcceaeb

class Assertions {
  statuscheck200(params) {
    expect(params).to.have.status(204);
    return lib.chakram.wait();
  }
}

export default new Assertions();
