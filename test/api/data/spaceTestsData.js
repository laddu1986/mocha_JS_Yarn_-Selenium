import * as lib from '../common';
import { spaces } from 'config/getEnv';

export const noName = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces`,
  data: {
    createdByAccountId: lib.spaceNegData.identityID,
    shortUrl: lib.randomString.generate(6)
  },
  expected: 'The Name field is required.'
};

export const noShortUrl = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces`,
  data: {
    name: lib.randomString.generate(10),
    createdByAccountId: lib.spaceNegData.identityID
  },
  expected: 'The ShortUrl field is required.'
};

export const blankName = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces`,
  data: {
    name: '',
    createdByAccountId: lib.spaceNegData.identityID,
    shortUrl: lib.randomString.generate(6)
  },
  expected:
    'The Name field is required.,The field Name must be a string with a minimum length of 1 and a maximum length of 75.'
};

export const blankShortUrl = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces`,
  data: {
    name: lib.randomString.generate(10),
    createdByAccountId: lib.spaceNegData.identityID,
    shortUrl: ''
  },
  expected:
    'The ShortUrl field is required.,The field ShortUrl must be a string with a minimum length of 1 and a maximum length of 20.'
};

export const bigName = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces`,
  data: {
    name: lib.randomString.generate(76),
    createdByAccountId: lib.spaceNegData.identityID,
    shortUrl: lib.randomString.generate(6)
  },
  expected: 'The field Name must be a string with a minimum length of 1 and a maximum length of 75.'
};

export const bigShortUrl = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces`,
  data: {
    name: lib.randomString.generate(10),
    createdByAccountId: lib.spaceNegData.identityID,
    shortUrl: lib.randomString.generate(21)
  },
  expected: 'The field ShortUrl must be a string with a minimum length of 1 and a maximum length of 20.'
};

export const noAccountId = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces`,
  data: {
    name: lib.randomString.generate(10),
    shortUrl: lib.randomString.generate(6)
  },
  expected: 'The CreatedByAccountId field is required.'
};

/*********************************PUT ***************************************/
export const noNamePut = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces`,
  data: {
    id: lib.spaceNegData.spaceID,
    rowVersion: lib.spaceNegData.spaceRowVersion,
    shortUrl: lib.randomString.generate(6)
  },
  expected: 'The Name field is required.'
};

export const blankNamePut = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces`,
  data: {
    name: '',
    id: lib.spaceNegData.spaceID,
    rowVersion: lib.spaceNegData.spaceRowVersion,
    shortUrl: lib.randomString.generate(6)
  },
  expected:
    'The Name field is required.,The field Name must be a string with a minimum length of 1 and a maximum length of 75.'
};

export const bigNamePut = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces`,
  data: {
    name: lib.randomString.generate(76),
    id: lib.spaceNegData.spaceID,
    rowVersion: lib.spaceNegData.spaceRowVersion,
    shortUrl: lib.randomString.generate(6)
  },
  expected: 'The field Name must be a string with a minimum length of 1 and a maximum length of 75.'
};

export const noIdPut = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces`,
  data: {
    name: lib.randomString.generate(5),
    rowVersion: lib.spaceNegData.spaceRowVersion,
    shortUrl: lib.randomString.generate(6)
  },
  expected: 'The Id field is required.'
};

export const noShortUrlPut = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces`,
  data: {
    id: lib.spaceNegData.spaceID,
    name: lib.randomString.generate(5),
    rowVersion: lib.spaceNegData.spaceRowVersion
  },
  expected: 'The ShortUrl field is required.'
};

export const blankShortUrlPut = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces`,
  data: {
    name: lib.randomString.generate(5),
    id: lib.spaceNegData.spaceID,
    rowVersion: lib.spaceNegData.spaceRowVersion,
    shortUrl: ''
  },
  expected:
    'The ShortUrl field is required.,The field ShortUrl must be a string with a minimum length of 1 and a maximum length of 20.'
};

export const bigShortUrlPut = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces`,
  data: {
    name: lib.randomString.generate(7),
    id: lib.spaceNegData.spaceID,
    rowVersion: lib.spaceNegData.spaceRowVersion,
    shortUrl: lib.randomString.generate(21)
  },
  expected: 'The field ShortUrl must be a string with a minimum length of 1 and a maximum length of 20.'
};

export const noRowVersionPut = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces`,
  data: {
    id: lib.spaceNegData.spaceID,
    name: lib.randomString.generate(5),
    shortUrl: lib.randomString.generate(6)
  }
};

export const incorrectOrgIDPut = {
  api: `${spaces + lib.spaceNegData.identityID}/spaces`,
  data: {
    id: lib.spaceNegData.spaceID,
    name: lib.randomString.generate(5),
    rowVersion: lib.spaceNegData.spaceRowVersion,
    shortUrl: lib.randomString.generate(6)
  }
};

export const incorrectSpaceIDPut = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces`,
  data: {
    id: lib.spaceNegData.orgID,
    name: lib.randomString.generate(5),
    rowVersion: lib.spaceNegData.spaceRowVersion,
    shortUrl: lib.randomString.generate(6)
  }
};
//-------------------------------------- GET ---------------------------------
export const incorrectOrgIDGet = {
  api: `${spaces + lib.spaceNegData.identityID}/spaces/${lib.spaceNegData.spaceID}`,
  data: ''
};

export const incorrectSpaceIDGet = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces/${lib.spaceNegData.identityID}`,
  data: ''
};

//***************************PATCH ********************************/

export const incorrectRowVersionPatch = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces/${lib.spaceNegData.spaceID}?rowVersion= `,
  data: [
    {
      op: 'replace',
      path: '/shortUrl',
      value: lib.randomString.generate(6)
    }
  ]
};
export const incorrectOrgIDPatch = {
  api: `${spaces + lib.spaceNegData.identityID}/spaces/${lib.spaceNegData.spaceID}?rowVersion=${
    lib.spaceNegData.spaceRowVersion
  }`,
  data: [
    {
      op: 'replace',
      path: '/shortUrl',
      value: lib.randomString.generate(6)
    }
  ]
};
export const incorrectSpaceIDPatch = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces/${lib.spaceNegData.identityID}?rowVersion=${
    lib.spaceNegData.spaceRowVersion
  }`,
  data: [
    {
      op: 'replace',
      path: '/shortUrl',
      value: lib.randomString.generate(6)
    }
  ]
};
export const blankNamePatch = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces/${lib.spaceNegData.spaceID}?rowVersion=${
    lib.spaceNegData.spaceRowVersion
  }`,
  data: [
    {
      op: 'replace',
      path: '/name',
      value: ''
    }
  ],
  expected:
    'The Name field is required.,The field Name must be a string with a minimum length of 1 and a maximum length of 75.'
};
export const noNamePatch = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces/${lib.spaceNegData.spaceID}?rowVersion=${
    lib.spaceNegData.spaceRowVersion
  }`,
  data: [
    {
      op: 'replace',
      path: '/name'
    }
  ],
  expected: 'The Name field is required.'
};
export const bigNamePatch = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces/${lib.spaceNegData.spaceID}?rowVersion=${
    lib.spaceNegData.spaceRowVersion
  }`,
  data: [
    {
      op: 'replace',
      path: '/name',
      value: lib.randomString.generate(76)
    }
  ],
  expected: 'The field Name must be a string with a minimum length of 1 and a maximum length of 75.'
};
export const blankShortUrlPatch = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces/${lib.spaceNegData.spaceID}?rowVersion=${
    lib.spaceNegData.spaceRowVersion
  }`,
  data: [
    {
      op: 'replace',
      path: '/shortUrl',
      value: ''
    }
  ],
  expected:
    'The ShortUrl field is required.,The field ShortUrl must be a string with a minimum length of 1 and a maximum length of 20.'
};
export const noShortUrlPatch = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces/${lib.spaceNegData.spaceID}?rowVersion=${
    lib.spaceNegData.spaceRowVersion
  }`,
  data: [
    {
      op: 'replace',
      path: '/shortUrl'
    }
  ],
  expected: 'The ShortUrl field is required.'
};
export const bigShortUrlPatch = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces/${lib.spaceNegData.spaceID}?rowVersion=${
    lib.spaceNegData.spaceRowVersion
  }`,
  data: [
    {
      op: 'replace',
      path: '/shortUrl',
      value: lib.randomString.generate(21)
    }
  ],
  expected: 'The field ShortUrl must be a string with a minimum length of 1 and a maximum length of 20.'
};
//---------------------------------- DELETE ---------------------------------------------

export const incorrectSpaceIDDelete = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces/${lib.spaceNegData.identityID}?rowVersion=${
    lib.spaceNegData.spaceRowVersion
  }`,
  data: ''
};

export const incorrectOrgIDDelete = {
  api: `${spaces + lib.spaceNegData.identityID}/spaces/${lib.spaceNegData.spaceID}?rowVersion=${
    lib.spaceNegData.spaceRowVersion
  }`,
  data: ''
};

export const noRowVersionDelete = {
  api: `${spaces + lib.spaceNegData.orgID}/spaces/${lib.spaceNegData.spaceID}?rowVersion=`,
  data: ''
};
