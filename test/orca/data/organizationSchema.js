import { joi } from '../common';

export function registerAndCreateOrgSchema(registerAndCreateOrgObject) {
  var schema = joi.object().keys({
    id: joi.string().required(),
    email: joi.valid(registerAndCreateOrgObject.AccountEmail).required(),
    name: joi.valid(registerAndCreateOrgObject.AccountName).required(),
    state: joi.object().keys({
      lastOrganizationSlug: joi.valid(null).required(),
      lastSpaceSlug: joi.valid(null).required()
    }),
    rights: joi.object().keys({
      organizations: joi.array().items({
        organizationId: joi
          .string()
          .uuid()
          .required(),
        role: joi.object().keys({
          name: joi.string().required(), //this needs to compare with "orgAdmin" after 7ch5a (clickup) is resolved
          permissionLevel: joi.number().required() //this needs to compare with "40" after 7ch5a (clickup) is resolved
        })
      })
    })
  });
  return schema;
}

export function organizationSchema(createOrgObject, name) {
  var time;
  if (name == createOrgObject.newName) {
    time = joi.date().required();
  } else time = joi.valid(null).required();
  var objectSchema = joi.object().keys({
    id: joi
      .string()
      .uuid()
      .required(),
    name: joi.valid(name).required(),
    slug: joi.valid(name.toLowerCase()).required(),
    createdByAccountId: joi
      .string()
      .uuid()
      .required(),
    rowVersion: joi.date().required(),
    createdTime: joi.date().required(),
    modifiedTime: time,
    spaces: joi.array().required(),
    members: joi.object().keys({
      total: joi.number().required(),
      members: joi.array().items({
        name: joi.valid(createOrgObject.AccountName).required(),
        email: joi.valid(createOrgObject.AccountEmail).required(),
        accountId: joi.valid(createOrgObject.AccountID).required(),
        organizationId: joi
          .string()
          .uuid()
          .required(),
        organizationName: joi.valid(name).required(),
        role: joi.object().keys({
          name: joi.string().required(), //this needs to compare with "orgAdmin" after 7ch5a (clickup) is resolved
          permissionLevel: joi.number().required() //this needs to compare with "40" after 7ch5a (clickup) is resolved
        }),
        currentUser: joi
          .boolean()
          .valid(true)
          .required()
      })
    }),
    invites: joi.object().keys({
      total: joi.number().required(),
      invites: joi.array().required()
    }),
    rowStatus: joi.valid('Active').required()
  });
  return objectSchema;
}

export function createOrgSchema(object) {
  var schema = joi.object().keys({
    id: joi.string().required(),
    email: [joi.valid(object.AccountEmail), joi.valid(object.inviteEmail)],
    name: [joi.valid(object.AccountName), joi.valid(object.CreateAccountName)],
    state: joi.object().keys({
      lastOrganizationSlug: joi.valid(null).required(),
      lastSpaceSlug: joi.valid(null).required()
    }),
    rights: joi.object().keys({
      organizations: joi.array().items({
        organizationId: joi
          .string()
          .uuid()
          .required(),
        role: joi.object().keys({
          name: joi.string().required(), //this needs to compare with "orgAdmin" after 7ch5a (clickup) is resolved
          permissionLevel: joi.number().required() //this needs to compare with "40" after 7ch5a (clickup) is resolved
        })
      })
    })
  });
  return schema;
}
