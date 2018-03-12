import { chakram } from '/Users/avinash.eediga/Documents/appcurator/qa-automation/test/common.js';
class Post  {
    
    //returns delete response object
    //params = url
	post(params) {
        const response = chakram.post(params[0],params[1]);
		return response;
	}
}

export default new Post;