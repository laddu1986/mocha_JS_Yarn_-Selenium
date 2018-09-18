import * as lib from '../../common';
import { spaces } from '../config/getEnv'

export const noName = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces`,
    data: {
        createdByAccountId: lib.responseData.negSpace[0].id,
        shortUrl: lib.randomString.generate(6)
    },
    expected: "The Name field is required."
};

export const noShortUrl = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces`,
    data: {
        name: lib.randomString.generate(10),
        createdByAccountId: lib.responseData.negSpace[0].id
    },
    expected: "The ShortUrl field is required."
};

export const blankName = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces`,
    data: {
        name: "",
        createdByAccountId: lib.responseData.negSpace[0].id,
        shortUrl: lib.randomString.generate(6)
    },
    expected: "The Name field is required.,The field Name must be a string with a minimum length of 1 and a maximum length of 75."
};

export const blankShortUrl = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces`,
    data: {
        name: lib.randomString.generate(10),
        createdByAccountId: lib.responseData.negSpace[0].id,
        shortUrl: ""
    },
    expected: "The ShortUrl field is required.,The field ShortUrl must be a string with a minimum length of 1 and a maximum length of 20."
};

export const bigName = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces`,
    data: {
        name: lib.randomString.generate(76),
        createdByAccountId: lib.responseData.negSpace[0].id,
        shortUrl: lib.randomString.generate(6)
    },
    expected: "The field Name must be a string with a minimum length of 1 and a maximum length of 75."
};

export const bigShortUrl = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces`,
    data: {
        name: lib.randomString.generate(10),
        createdByAccountId: lib.responseData.negSpace[0].id,
        shortUrl: lib.randomString.generate(21)
    },
    expected: "The field ShortUrl must be a string with a minimum length of 1 and a maximum length of 20."
};

export const noAccountId = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces`,
    data: {
        name: lib.randomString.generate(10),
        shortUrl: lib.randomString.generate(6)
    },
    expected: "The CreatedByAccountId field is required."
};

/*********************************PUT ***************************************/
export const noNamePut = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces`,
    data: {
        id: lib.responseData.negSpace[2].id,
        rowVersion: lib.responseData.negSpace[2].rowVersion,
        shortUrl: lib.randomString.generate(6)
    },
    expected: "The Name field is required."
};

export const blankNamePut = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces`,
    data: {
        name: "",
        id: lib.responseData.negSpace[2].id,
        rowVersion: lib.responseData.negSpace[2].rowVersion,
        shortUrl: lib.randomString.generate(6)
    },
    expected: "The Name field is required.,The field Name must be a string with a minimum length of 1 and a maximum length of 75."
};

export const bigNamePut = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces`,
    data: {
        name: lib.randomString.generate(76),
        id: lib.responseData.negSpace[2].id,
        rowVersion: lib.responseData.negSpace[2].rowVersion,
        shortUrl: lib.randomString.generate(6)
    },
    expected: "The field Name must be a string with a minimum length of 1 and a maximum length of 75."
};

export const noIdPut = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces`,
    data: {
        name: lib.randomString.generate(5),
        rowVersion: lib.responseData.negSpace[2].rowVersion,
        shortUrl: lib.randomString.generate(6)
    },
    expected: "The Id field is required."
};

export const noShortUrlPut = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces`,
    data: {
        id: lib.responseData.negSpace[2].id,
        name: lib.randomString.generate(5),
        rowVersion: lib.responseData.negSpace[2].rowVersion
    },
    expected: "The ShortUrl field is required."
};

export const blankShortUrlPut = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces`,
    data: {
        name: lib.randomString.generate(5),
        id: lib.responseData.negSpace[2].id,
        rowVersion: lib.responseData.negSpace[2].rowVersion,
        shortUrl: ""
    },
    expected: "The ShortUrl field is required.,The field ShortUrl must be a string with a minimum length of 1 and a maximum length of 20."
};

export const bigShortUrlPut = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces`,
    data: {
        name: lib.randomString.generate(7),
        id: lib.responseData.negSpace[2].id,
        rowVersion: lib.responseData.negSpace[2].rowVersion,
        shortUrl: lib.randomString.generate(21)
    },
    expected: "The field ShortUrl must be a string with a minimum length of 1 and a maximum length of 20."
};

export const noRowVersionPut = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces`,
    data: {
        id: lib.responseData.negSpace[2].id,
        name: lib.randomString.generate(5),
        shortUrl: lib.randomString.generate(6)
    }
};

export const incorrectOrgIDPut = {
    api: `${spaces + lib.responseData.negSpace[0].id}/spaces`,
    data: {
        id: lib.responseData.negSpace[2].id,
        name: lib.randomString.generate(5),
        rowVersion: lib.responseData.negSpace[2].rowVersion,
        shortUrl: lib.randomString.generate(6)
    }
};

export const incorrectSpaceIDPut = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces`,
    data: {
        id: lib.responseData.negSpace[1].id,
        name: lib.randomString.generate(5),
        rowVersion: lib.responseData.negSpace[2].rowVersion,
        shortUrl: lib.randomString.generate(6)
    }
};
//-------------------------------------- GET ---------------------------------
export const incorrectOrgIDGet = {
    api: `${spaces + lib.responseData.negSpace[0].id}/spaces/${lib.responseData.negSpace[2].id}`,
    data: ""
};

export const incorrectSpaceIDGet = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces/${lib.responseData.negSpace[0].id}`,
    data: ""
};

//***************************PATCH ********************************/

export const incorrectRowVersionPatch = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces/${lib.responseData.negSpace[2].id}?rowVersion= `,
    data: [
        {
            op: "replace",
            path: "/shortUrl",
            value: lib.randomString.generate(6)
        }
    ]
};
export const incorrectOrgIDPatch = {
    api: `${spaces + lib.responseData.negSpace[0].id}/spaces/${lib.responseData.negSpace[2].id}?rowVersion=${lib.responseData.negSpace[2].rowVersion}`,
    data: [
        {
            op: "replace",
            path: "/shortUrl",
            value: lib.randomString.generate(6)
        }
    ]
};
export const incorrectSpaceIDPatch = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces/${lib.responseData.negSpace[0].id}?rowVersion=${lib.responseData.negSpace[2].rowVersion}`,
    data: [
        {
            op: "replace",
            path: "/shortUrl",
            value: lib.randomString.generate(6)
        }
    ]
};
export const blankNamePatch = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces/${lib.responseData.negSpace[2].id}?rowVersion=${lib.responseData.negSpace[2].rowVersion}`,
    data: [
        {
            op: "replace",
            path: "/name",
            value: ""
        }
    ],
    expected: "The Name field is required.,The field Name must be a string with a minimum length of 1 and a maximum length of 75."
};
export const noNamePatch = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces/${lib.responseData.negSpace[2].id}?rowVersion=${lib.responseData.negSpace[2].rowVersion}`,
    data: [
        {
            op: "replace",
            path: "/name"
        }
    ],
    expected: "The Name field is required."
};
export const bigNamePatch = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces/${lib.responseData.negSpace[2].id}?rowVersion=${lib.responseData.negSpace[2].rowVersion}`,
    data: [
        {
            op: "replace",
            path: "/name",
            value: lib.randomString.generate(76)
        }
    ],
    expected: "The field Name must be a string with a minimum length of 1 and a maximum length of 75."
};
export const blankShortUrlPatch = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces/${lib.responseData.negSpace[2].id}?rowVersion=${lib.responseData.negSpace[2].rowVersion}`,
    data: [
        {
            op: "replace",
            path: "/shortUrl",
            value: ""
        }
    ],
    expected: "The ShortUrl field is required.,The field ShortUrl must be a string with a minimum length of 1 and a maximum length of 20."
};
export const noShortUrlPatch = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces/${lib.responseData.negSpace[2].id}?rowVersion=${lib.responseData.negSpace[2].rowVersion}`,
    data: [
        {
            op: "replace",
            path: "/shortUrl"
        }
    ],
    expected: "The ShortUrl field is required."
};
export const bigShortUrlPatch = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces/${lib.responseData.negSpace[2].id}?rowVersion=${lib.responseData.negSpace[2].rowVersion}`,
    data: [
        {
            op: "replace",
            path: "/shortUrl",
            value: lib.randomString.generate(21)
        }
    ],
    expected: "The field ShortUrl must be a string with a minimum length of 1 and a maximum length of 20."
};
//---------------------------------- DELETE ---------------------------------------------

export const incorrectSpaceIDDelete = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces/${lib.responseData.negSpace[0].id}?rowVersion=${lib.responseData.negSpace[2].rowVersion}`,
    data: ""
};

export const incorrectOrgIDDelete = {
    api: `${spaces + lib.responseData.negSpace[0].id}/spaces/${lib.responseData.negSpace[2].id}?rowVersion=${lib.responseData.negSpace[2].rowVersion}`,
    data: ""
};

export const noRowVersionDelete = {
    api: `${spaces + lib.responseData.negSpace[1].id}/spaces/${lib.responseData.negSpace[2].id}?rowVersion=`,
    data: ""
};