import * as lib from '../../common';

class Post {
  // returns delete response object
  // params = url
  post(params) {
    const response = lib.chakram.post(params[0], params[1]);
    return response;
  }
}

export default new Post();
