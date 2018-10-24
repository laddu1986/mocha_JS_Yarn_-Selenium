import { joi, invitesSchemaData, inviteData } from '../common';
import * as Constants from 'constants.json';

const objectSchema = joi.object().keys({
  token: joi
    .string()
    .uuid()
    .required(),
  email: joi.valid(invitesSchemaData.email).required(),
  createdTime: joi.date().required(),
  status: joi.valid(Constants.InviteStatus.Pending).required(),
  expiryDate: joi.date().required()
});
export const getInviteSchema = joi.object().keys({
  totalRows: joi.valid(1).required(),
  results: joi
    .array()
    .items(objectSchema)
    .required()
});

export const getInviteByTokenSchema = joi.object().keys({
  email: joi.valid(invitesSchemaData.email).required(),
  organizationId: joi
    .string()
    .uuid()
    .valid(inviteData.orgID)
    .required(),
  organizationName: joi.valid(inviteData.orgName).required(),
  hasAccount: joi
    .boolean()
    .valid(false)
    .required(),
  status: joi.valid(Constants.InviteStatus.Pending).required()
});
