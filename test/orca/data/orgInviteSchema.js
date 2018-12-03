import { joi } from '../common';

export function orgInviteSchema(object) {
  var schema = joi.object().keys({
    total: joi.valid(1).required(),
    invites: joi.array().items({
      token: joi
        .string()
        .uuid()
        .required(),
      expiryDate: joi.date().required(),
      createdTime: joi.date().required(),
      email: joi.string(object.inviteEmail).required(),
      status: joi.valid('Pending').required() //createdByAccountId and organizationId needs to be added once https://app.clickup.com/301733/t/7m24r is resolved
    })
  });
  return schema;
}

export function getOrgInviteInfoSchema(object) {
  var schema = joi.object().keys({
    hasAccount: joi
      .boolean()
      .valid(false)
      .required(),
    organizationId: joi
      .string()
      .uuid()
      .required(),
    email: joi.string(object.inviteEmail).required(),
    status: joi.valid('Pending').required(),
    organizationName: joi
      .string()
      .valid(object.orgName)
      .required()
  });
  return schema;
}

export function acceptInviteSchema(object) {
  var schema = joi.object().keys({
    id: joi
      .string()
      .uuid()
      .required(),
    name: joi
      .string()
      .valid(object.orgName)
      .required(),
    slug: joi
      .string()
      .valid(object.orgName.toLowerCase())
      .required(),
    createdByAccountId: joi
      .string()
      .uuid()
      .required(),
    rowVersion: joi.date().required(),
    createdTime: joi.date().required(),
    modifiedTime: joi.valid(null).required(),
    spaces: joi.array().required(),
    members: joi.object().keys({
      total: joi
        .number()
        .valid(2)
        .required(),
      members: joi.array().items({
        name: [joi.valid(object.AccountName), joi.valid(object.CreateAccountName)],
        email: [joi.valid(object.AccountEmail), joi.valid(object.inviteEmail)],
        accountId: joi
          .string()
          .uuid()
          .required(),
        organizationId: joi.valid(object.orgID).required(),
        organizationName: joi.valid(object.orgName).required(),
        role: joi.object().keys({
          name: joi.string().required(),
          permissionLevel: joi.number().required()
        }),
        currentUser: [joi.boolean().valid(true), joi.valid(null)]
      })
    }),
    invites: joi.object().keys({
      total: joi
        .number()
        .valid(0)
        .required(),
      invites: joi.array().required()
    }),
    rowStatus: joi.valid('Active').required()
  });
  return schema;
}
