import { joi, orgData, organizationsSchemaData } from '../common';
import * as Constants from 'constants.json';
import * as organization from 'actions/organization';

export const createOrgSchema = joi.object().keys({
  id: joi
    .string()
    .uuid()
    .required(),
  name: joi.valid(organizationsSchemaData.name).required(),
  createdByAccountId: joi.valid(orgData.identityID).required(),
  rowVersion: joi.date().required(),
  createdTime: joi.date().required(),
  modifiedTime: joi.valid(null).required(),
  rowStatus: joi.valid(Constants.APIKeyStatus.Active).required()
});
export const getOrganizationByIdSchema = joi.object().keys({
  id: joi.valid(orgData.orgID).required(),
  name: joi.valid(organizationsSchemaData.name).required(),
  createdByAccountId: joi.valid(orgData.identityID).required(),
  rowVersion: joi.date().required(),
  createdTime: joi.date().required(),
  modifiedTime: joi.valid(null).required(),
  rowStatus: joi.valid(Constants.APIKeyStatus.Active.replace(/\s/g, '')).required()
});
const objectSchema = joi.object().keys({
  id: joi.valid(orgData.orgID).required(),
  name: joi.valid(organizationsSchemaData.name).required(),
  createdByAccountId: joi.valid(orgData.identityID).required(),
  rowVersion: joi.date().required(),
  createdTime: joi.date().required(),
  modifiedTime: joi.valid(null).required(),
  rowStatus: joi.valid(Constants.APIKeyStatus.Active).required()
});
export const postOrganizationsSchema = joi
  .array()
  .items(objectSchema)
  .required();

export const putOrgSchema = joi.object().keys({
  id: joi.valid(orgData.orgID).required(),
  name: joi.valid(organization.newName).required(),
  createdByAccountId: joi.valid(orgData.identityID).required(),
  rowVersion: joi.date().required(),
  createdTime: joi.date().required(),
  modifiedTime: joi.date().required(),
  rowStatus: joi.valid(Constants.APIKeyStatus.Active).required()
});
