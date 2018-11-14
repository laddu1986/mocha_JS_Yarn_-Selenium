import { randomString } from '../common';
import { spaces } from 'config/getEnv';

export function noName(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces`,
    data: {
      createdByAccountId: spaceNegData.identityID,
      shortUrl: randomString.generate(6)
    },
    expected: 'The Name field is required.'
  };
}

export function noShortUrl(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces`,
    data: {
      name: randomString.generate(10),
      createdByAccountId: spaceNegData.identityID
    },
    expected: 'The ShortUrl field is required.'
  };
}

export function blankName(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces`,
    data: {
      name: '',
      createdByAccountId: spaceNegData.identityID,
      shortUrl: randomString.generate(6)
    },
    expected:
      'The Name field is required.,The field Name must be a string with a minimum length of 1 and a maximum length of 75.'
  };
}

export function blankShortUrl(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces`,
    data: {
      name: randomString.generate(10),
      createdByAccountId: spaceNegData.identityID,
      shortUrl: ''
    },
    expected:
      'The ShortUrl field is required.,The field ShortUrl must be a string with a minimum length of 1 and a maximum length of 20.'
  };
}

export function bigName(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces`,
    data: {
      name: randomString.generate(76),
      createdByAccountId: spaceNegData.identityID,
      shortUrl: randomString.generate(6)
    },
    expected: 'The field Name must be a string with a minimum length of 1 and a maximum length of 75.'
  };
}

export function bigShortUrl(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces`,
    data: {
      name: randomString.generate(10),
      createdByAccountId: spaceNegData.identityID,
      shortUrl: randomString.generate(21)
    },
    expected: 'The field ShortUrl must be a string with a minimum length of 1 and a maximum length of 20.'
  };
}

export function noAccountId(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces`,
    data: {
      name: randomString.generate(10),
      shortUrl: randomString.generate(6)
    },
    expected: 'The CreatedByAccountId field is required.'
  };
}

/*********************************PUT ***************************************/
export function noNamePut(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces`,
    data: {
      id: spaceNegData.spaceID,
      rowVersion: spaceNegData.spaceRowVersion,
      shortUrl: randomString.generate(6)
    },
    expected: 'The Name field is required.'
  };
}

export function blankNamePut(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces`,
    data: {
      name: '',
      id: spaceNegData.spaceID,
      rowVersion: spaceNegData.spaceRowVersion,
      shortUrl: randomString.generate(6)
    },
    expected:
      'The Name field is required.,The field Name must be a string with a minimum length of 1 and a maximum length of 75.'
  };
}

export function bigNamePut(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces`,
    data: {
      name: randomString.generate(76),
      id: spaceNegData.spaceID,
      rowVersion: spaceNegData.spaceRowVersion,
      shortUrl: randomString.generate(6)
    },
    expected: 'The field Name must be a string with a minimum length of 1 and a maximum length of 75.'
  };
}

export function noIdPut(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces`,
    data: {
      name: randomString.generate(5),
      rowVersion: spaceNegData.spaceRowVersion,
      shortUrl: randomString.generate(6)
    },
    expected: 'The Id field is required.'
  };
}

export function noShortUrlPut(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces`,
    data: {
      id: spaceNegData.spaceID,
      name: randomString.generate(5),
      rowVersion: spaceNegData.spaceRowVersion
    },
    expected: 'The ShortUrl field is required.'
  };
}

export function blankShortUrlPut(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces`,
    data: {
      name: randomString.generate(5),
      id: spaceNegData.spaceID,
      rowVersion: spaceNegData.spaceRowVersion,
      shortUrl: ''
    },
    expected:
      'The ShortUrl field is required.,The field ShortUrl must be a string with a minimum length of 1 and a maximum length of 20.'
  };
}

export function bigShortUrlPut(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces`,
    data: {
      name: randomString.generate(7),
      id: spaceNegData.spaceID,
      rowVersion: spaceNegData.spaceRowVersion,
      shortUrl: randomString.generate(21)
    },
    expected: 'The field ShortUrl must be a string with a minimum length of 1 and a maximum length of 20.'
  };
}

export function noRowVersionPut(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces`,
    data: {
      id: spaceNegData.spaceID,
      name: randomString.generate(5),
      shortUrl: randomString.generate(6)
    }
  };
}

export function incorrectOrgIDPut(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.identityID}/spaces`,
    data: {
      id: spaceNegData.spaceID,
      name: randomString.generate(5),
      rowVersion: spaceNegData.spaceRowVersion,
      shortUrl: randomString.generate(6)
    }
  };
}

export function incorrectSpaceIDPut(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces`,
    data: {
      id: spaceNegData.orgID,
      name: randomString.generate(5),
      rowVersion: spaceNegData.spaceRowVersion,
      shortUrl: randomString.generate(6)
    }
  };
}

//-------------------------------------- GET ---------------------------------
export function incorrectOrgIDGet(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.identityID}/spaces/${spaceNegData.spaceID}`,
    data: ''
  };
}

export function incorrectSpaceIDGet(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces/${spaceNegData.identityID}`,
    data: ''
  };
}

//***************************PATCH ********************************/

export function incorrectRowVersionPatch(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces/${spaceNegData.spaceID}?rowVersion= `,
    data: [
      {
        op: 'replace',
        path: '/shortUrl',
        value: randomString.generate(6)
      }
    ]
  };
}

export function incorrectOrgIDPatch(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.identityID}/spaces/${spaceNegData.spaceID}?rowVersion=${
      spaceNegData.spaceRowVersion
    }`,
    data: [
      {
        op: 'replace',
        path: '/shortUrl',
        value: randomString.generate(6)
      }
    ]
  };
}

export function incorrectSpaceIDPatch(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces/${spaceNegData.identityID}?rowVersion=${spaceNegData.spaceRowVersion}`,
    data: [
      {
        op: 'replace',
        path: '/shortUrl',
        value: randomString.generate(6)
      }
    ]
  };
}

export function blankNamePatch(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces/${spaceNegData.spaceID}?rowVersion=${spaceNegData.spaceRowVersion}`,
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
}

export function noNamePatch(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces/${spaceNegData.spaceID}?rowVersion=${spaceNegData.spaceRowVersion}`,
    data: [
      {
        op: 'replace',
        path: '/name'
      }
    ],
    expected: 'The Name field is required.'
  };
}

export function bigNamePatch(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces/${spaceNegData.spaceID}?rowVersion=${spaceNegData.spaceRowVersion}`,
    data: [
      {
        op: 'replace',
        path: '/name',
        value: randomString.generate(76)
      }
    ],
    expected: 'The field Name must be a string with a minimum length of 1 and a maximum length of 75.'
  };
}

export function blankShortUrlPatch(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces/${spaceNegData.spaceID}?rowVersion=${spaceNegData.spaceRowVersion}`,
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
}

export function noShortUrlPatch(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces/${spaceNegData.spaceID}?rowVersion=${spaceNegData.spaceRowVersion}`,
    data: [
      {
        op: 'replace',
        path: '/shortUrl'
      }
    ],
    expected: 'The ShortUrl field is required.'
  };
}

export function bigShortUrlPatch(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces/${spaceNegData.spaceID}?rowVersion=${spaceNegData.spaceRowVersion}`,
    data: [
      {
        op: 'replace',
        path: '/shortUrl',
        value: randomString.generate(21)
      }
    ],
    expected: 'The field ShortUrl must be a string with a minimum length of 1 and a maximum length of 20.'
  };
}

//---------------------------------- DELETE ---------------------------------------------

export function incorrectSpaceIDDelete(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces/${spaceNegData.identityID}?rowVersion=${spaceNegData.spaceRowVersion}`,
    data: ''
  };
}

export function incorrectOrgIDDelete(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.identityID}/spaces/${spaceNegData.spaceID}?rowVersion=${
      spaceNegData.spaceRowVersion
    }`,
    data: ''
  };
}

export function noRowVersionDelete(spaceNegData) {
  return {
    api: `${spaces + spaceNegData.orgID}/spaces/${spaceNegData.spaceID}?rowVersion=`,
    data: ''
  };
}
