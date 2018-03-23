/* The following block generates a random string */
import * as lib from '../../common';

class Common {
  get fullname() { return lib.faker.name.findName(); }
  get email() { return lib.faker.internet.email(); }
  get password() { return lib.faker.internet.password(); }

  lib() {
    return lib;
  }
  
}

export default Common;
