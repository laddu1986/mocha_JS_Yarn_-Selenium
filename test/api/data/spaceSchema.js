import { joi, spaceData, spaceSchemaData } from '../../common';
import * as Constants from 'data/constants.json';

export function postSpaceByOrganizationIdSchema() {
  var schema = joi.object().keys({
    createdByAccountId: joi.valid(spaceData.identityID).required(),
    id: joi
      .string()
      .uuid()
      .required(),
    keys: joi.valid(null).required(),
    modifiedTime: joi.valid(null).required(),
    name: joi.valid(spaceSchemaData.name).required(),
    organizationId: joi.valid(spaceData.orgID).required(),
    rowStatus: joi.valid(Constants.APIKeyStatus.Active).required(),
    rowVersion: joi.date().required(),
    shortUrl: joi.valid(spaceSchemaData.shortUrl).required()
  });
  return schema;
}

export function getSpacesByOrganizationIdSchema() {
  const schemaObject = joi.object().keys({
    createdByAccountId: joi.valid(spaceData.identityID).required(),
    id: joi.valid(spaceData.spaceID).required(),
    keys: joi.valid(null).required(),
    modifiedTime: joi.valid(null).required(),
    name: joi.valid(spaceSchemaData.name).required(),
    organizationId: joi.valid(spaceData.orgID).required(),
    rowStatus: joi.valid(Constants.APIKeyStatus.Active).required(),
    rowVersion: joi.date().required(),
    shortUrl: joi.valid(spaceSchemaData.shortUrl).required()
  });
  return joi
    .array()
    .items(schemaObject)
    .required();
}

export function updateSpaceSchema() {
  const Schema = joi.object().keys({
    createdByAccountId: joi.valid(spaceData.identityID).required(),
    id: joi.valid(spaceData.spaceID).required(),
    keys: joi.valid(null).required(),
    modifiedTime: joi.date().required(),
    name: joi.valid(spaceSchemaData.newName).required(),
    organizationId: joi.valid(spaceData.orgID).required(),
    rowStatus: joi.valid(Constants.APIKeyStatus.Active).required(),
    rowVersion: joi.date().required(),
    shortUrl: joi.valid(spaceSchemaData.newShortUrl).required()
  });
  return Schema;
}

export function getSpaceByOrgIdAndSpaceIdSchema() {
  var schema = joi.object().keys({
    createdByAccountId: joi.valid(spaceData.identityID).required(),
    id: joi.valid(spaceData.spaceID).required(),
    keys: joi.valid(null).required(),
    modifiedTime: joi.date().required(),
    name: joi.valid(spaceSchemaData.newName).required(),
    organizationId: joi.valid(spaceData.orgID).required(),
    rowStatus: joi.valid(Constants.APIKeyStatus.Active).required(),
    rowVersion: joi.date().required(),
    shortUrl: joi.valid(spaceSchemaData.newShortUrl).required()
  });
  return schema;
}

export function patchSpaceShortUrlSchema() {
  var schema = joi.object().keys({
    createdByAccountId: joi.valid(spaceData.identityID).required(),
    id: joi.valid(spaceData.spaceID).required(),
    keys: joi.valid(null).required(),
    modifiedTime: joi.date().required(),
    name: joi.valid(spaceSchemaData.newName).required(),
    organizationId: joi.valid(spaceData.orgID).required(),
    rowStatus: joi.valid(Constants.APIKeyStatus.Active).required(),
    rowVersion: joi.date().required(),
    shortUrl: joi.valid(spaceSchemaData.patchedShortUrl).required()
  });
  return schema;
}

export function patchSpaceNameSchema() {
  var schema = joi.object().keys({
    createdByAccountId: joi.valid(spaceData.identityID).required(),
    id: joi.valid(spaceData.spaceID).required(),
    keys: joi.valid(null).required(),
    modifiedTime: joi.date().required(),
    name: joi.valid(spaceSchemaData.patchedName).required(),
    organizationId: joi.valid(spaceData.orgID).required(),
    rowStatus: joi.valid(Constants.APIKeyStatus.Active).required(),
    rowVersion: joi.date().required(),
    shortUrl: joi.valid(spaceSchemaData.patchedShortUrl).required()
  });
  return schema;
}
