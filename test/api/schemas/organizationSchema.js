import { joi } from '../common';
import * as Constants from 'constants.json';
import * as organization from 'actions/organization';

export function createOrgSchema(orgData) {
  return joi.object().keys({
    id: joi
      .string()
      .uuid()
      .required(),
    name: joi.valid(orgData.orgName).required(),
    createdByAccountId: joi.valid(orgData.identityID).required(),
    rowVersion: joi.date().required(),
    createdTime: joi.date().required(),
    modifiedTime: joi.valid(null).required(),
    rowStatus: joi.valid(Constants.APIKeyStatus.Active).required()
  });
}
export function getOrganizationByIdSchema(orgData) {
  return joi.object().keys({
    id: joi.valid(orgData.orgID).required(),
    name: joi.valid(orgData.orgName).required(),
    createdByAccountId: joi.valid(orgData.identityID).required(),
    rowVersion: joi.date().required(),
    createdTime: joi.date().required(),
    modifiedTime: joi.valid(null).required(),
    rowStatus: joi.valid(Constants.APIKeyStatus.Active.replace(/\s/g, '')).required()
  });
}
function orgSchema(orgData) {
  return joi.object().keys({
    id: joi.valid(orgData.orgID).required(),
    name: joi.valid(orgData.orgName).required(),
    createdByAccountId: joi.valid(orgData.identityID).required(),
    rowVersion: joi.date().required(),
    createdTime: joi.date().required(),
    modifiedTime: joi.valid(null).required(),
    rowStatus: joi.valid(Constants.APIKeyStatus.Active).required()
  });
}

export function postOrganizationsSchema(orgData) {
  return joi
    .array()
    .items(orgSchema(orgData))
    .required();
}

export function putOrgSchema(orgData) {
  return joi.object().keys({
    id: joi.valid(orgData.orgID).required(),
    name: joi.valid(organization.newName).required(),
    createdByAccountId: joi.valid(orgData.identityID).required(),
    rowVersion: joi.date().required(),
    createdTime: joi.date().required(),
    modifiedTime: joi.date().required(),
    rowStatus: joi.valid(Constants.APIKeyStatus.Active).required()
  });
}
