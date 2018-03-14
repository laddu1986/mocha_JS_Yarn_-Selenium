import { chakram } from '../../common';

class Delete {
  // returns delete response object
  // params = url
  delete(params) {
    const response = chakram.delete(params);
    return response;
  }
}

export default new Delete();
