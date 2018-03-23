<<<<<<< HEAD
import * as lib from '../../common';

class Post {
  // returns delete response object
  // params = url
  post(params) {
    const response = lib.chakram.post(params[0], params[1]);
    return response;
  }
=======
import { chakram } from '../../common';
class Post  {
    
    //returns delete response object
    //params = url
	post(params) {
        const response = chakram.post(params[0],params[1]);
		return response;
	}
>>>>>>> 0d0d9f47265e965904031d8f79bde1953bcceaeb
}

export default new Post();
