const config = require('config-yml');
class Page {
	
	open(path) {
		let base = config.api.base;
		console.log(base + path);
		browser.url(path);
	}
}

export default Page;
