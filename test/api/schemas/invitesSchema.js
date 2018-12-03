import { joi } from '../common';
import * as Constants from 'constants.json';

function inviteSchema(inviteData) {
  return joi.object().keys({
    token: joi
      .string()
      .uuid()
      .required(),
    email: joi.valid(inviteData.inviteEmail).required(),
    createdTime: joi.date().required(),
    status: joi.valid(Constants.InviteStatus.Pending).required(),
    expiryDate: joi.date().required()
  });
}

export function getInviteSchema(inviteData) {
  return joi.object().keys({
    totalRows: joi.valid(1).required(),
    results: joi
      .array()
      .items(inviteSchema(inviteData))
      .required()
  });
}

export function getInviteByTokenSchema(inviteData) {
  return joi.object().keys({
    email: joi.valid(inviteData.inviteEmail).required(),
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
}
