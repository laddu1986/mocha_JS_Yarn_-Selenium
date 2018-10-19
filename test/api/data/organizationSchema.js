import * as lib from '../../common';
import * as Constants from 'data/constants.json';
import * as organization from 'api/actions/organization';

export const createOrgSchema = lib.joi.object().keys({
  id: lib.joi
    .string()
    .uuid()
    .required(),
  name: lib.joi.valid(lib.organizationsSchemaData.name).required(),
  createdByAccountId: lib.joi.valid(lib.orgData.identityID).required(),
  rowVersion: lib.joi.date().required(),
  createdTime: lib.joi.date().required(),
  modifiedTime: lib.joi.valid(null).required(),
  rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required()
});
export const getOrganizationByIdSchema = lib.joi.object().keys({
  id: lib.joi.valid(lib.orgData.orgID).required(),
  name: lib.joi.valid(lib.organizationsSchemaData.name).required(),
  createdByAccountId: lib.joi.valid(lib.orgData.identityID).required(),
  rowVersion: lib.joi.date().required(),
  createdTime: lib.joi.date().required(),
  modifiedTime: lib.joi.valid(null).required(),
  rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active.replace(/\s/g, '')).required()
});
const objectSchema = lib.joi.object().keys({
  id: lib.joi.valid(lib.orgData.orgID).required(),
  name: lib.joi.valid(lib.organizationsSchemaData.name).required(),
  createdByAccountId: lib.joi.valid(lib.orgData.identityID).required(),
  rowVersion: lib.joi.date().required(),
  createdTime: lib.joi.date().required(),
  modifiedTime: lib.joi.valid(null).required(),
  rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required()
});
export const postOrganizationsSchema = lib.joi
  .array()
  .items(objectSchema)
  .required();

export const putOrgSchema = lib.joi.object().keys({
  id: lib.joi.valid(lib.orgData.orgID).required(),
  name: lib.joi.valid(organization.newName).required(),
  createdByAccountId: lib.joi.valid(lib.orgData.identityID).required(),
  rowVersion: lib.joi.date().required(),
  createdTime: lib.joi.date().required(),
  modifiedTime: lib.joi.date().required(),
  rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required()
});
