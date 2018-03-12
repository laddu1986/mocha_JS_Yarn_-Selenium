import { chakram } from '/Users/avinash.eediga/Documents/appcurator/qa-automation/test/common.js';

class Delete {
  // returns delete response object
  // params = url
  delete(params) {
    const response = chakram.delete(params);
    return response;
  }
}

export default new Delete();
