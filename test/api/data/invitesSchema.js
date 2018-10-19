import * as lib from '../../common';
import * as Constants from 'data/constants.json';

const objectSchema = lib.joi.object().keys({
  token: lib.joi
    .string()
    .uuid()
    .required(),
  email: lib.joi.valid(lib.invitesSchemaData.email).required(),
  createdTime: lib.joi.date().required(),
  status: lib.joi.valid(Constants.InviteStatus.Pending).required(),
  expiryDate: lib.joi.date().required()
});
export const getInviteSchema = lib.joi.object().keys({
  totalRows: lib.joi.valid(1).required(),
  results: lib.joi
    .array()
    .items(objectSchema)
    .required()
});

export const getInviteByTokenSchema = lib.joi.object().keys({
  email: lib.joi.valid(lib.invitesSchemaData.email).required(),
  organizationId: lib.joi
    .string()
    .uuid()
    .valid(lib.inviteData.orgID)
    .required(),
  organizationName: lib.joi.valid(lib.inviteData.orgName).required(),
  hasAccount: lib.joi
    .boolean()
    .valid(false)
    .required(),
  status: lib.joi.valid(Constants.InviteStatus.Pending).required()
});
