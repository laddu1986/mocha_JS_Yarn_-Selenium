<<<<<<< HEAD
import * as lib from '../../common';
=======
import { chakram } from '../../common';
>>>>>>> 0d0d9f47265e965904031d8f79bde1953bcceaeb

class Delete {
  // returns delete response object
  // params = url
  delete(params) {
    const response = lib.chakram.delete(params);
    return response;
  }
}

export default new Delete();
