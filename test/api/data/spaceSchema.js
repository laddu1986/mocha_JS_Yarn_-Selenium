import * as lib from '../../common';
import * as Constants from 'data/constants.json';

export function postSpaceByOrganizationIdSchema() {
  var schema = lib.joi.object().keys({
    createdByAccountId: lib.joi.valid(lib.spaceData.identityID).required(),
    id: lib.joi
      .string()
      .uuid()
      .required(),
    keys: lib.joi.valid(null).required(),
    modifiedTime: lib.joi.valid(null).required(),
    name: lib.joi.valid(lib.spaceSchemaData.name).required(),
    organizationId: lib.joi.valid(lib.spaceData.orgID).required(),
    rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required(),
    rowVersion: lib.joi.date().required(),
    shortUrl: lib.joi.valid(lib.spaceSchemaData.shortUrl).required()
  });
  return schema;
}

export function getSpacesByOrganizationIdSchema() {
  const schemaObject = lib.joi.object().keys({
    createdByAccountId: lib.joi.valid(lib.spaceData.identityID).required(),
    id: lib.joi.valid(lib.spaceData.spaceID).required(),
    keys: lib.joi.valid(null).required(),
    modifiedTime: lib.joi.valid(null).required(),
    name: lib.joi.valid(lib.spaceSchemaData.name).required(),
    organizationId: lib.joi.valid(lib.spaceData.orgID).required(),
    rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required(),
    rowVersion: lib.joi.date().required(),
    shortUrl: lib.joi.valid(lib.spaceSchemaData.shortUrl).required()
  });
  return lib.joi
    .array()
    .items(schemaObject)
    .required();
}

export function updateSpaceSchema() {
  const Schema = lib.joi.object().keys({
    createdByAccountId: lib.joi.valid(lib.spaceData.identityID).required(),
    id: lib.joi.valid(lib.spaceData.spaceID).required(),
    keys: lib.joi.valid(null).required(),
    modifiedTime: lib.joi.date().required(),
    name: lib.joi.valid(lib.spaceSchemaData.newName).required(),
    organizationId: lib.joi.valid(lib.spaceData.orgID).required(),
    rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required(),
    rowVersion: lib.joi.date().required(),
    shortUrl: lib.joi.valid(lib.spaceSchemaData.newShortUrl).required()
  });
  return Schema;
}

export function getSpaceByOrgIdAndSpaceIdSchema() {
  var schema = lib.joi.object().keys({
    createdByAccountId: lib.joi.valid(lib.spaceData.identityID).required(),
    id: lib.joi.valid(lib.spaceData.spaceID).required(),
    keys: lib.joi.valid(null).required(),
    modifiedTime: lib.joi.date().required(),
    name: lib.joi.valid(lib.spaceSchemaData.newName).required(),
    organizationId: lib.joi.valid(lib.spaceData.orgID).required(),
    rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required(),
    rowVersion: lib.joi.date().required(),
    shortUrl: lib.joi.valid(lib.spaceSchemaData.newShortUrl).required()
  });
  return schema;
}

export function patchSpaceShortUrlSchema() {
  var schema = lib.joi.object().keys({
    createdByAccountId: lib.joi.valid(lib.spaceData.identityID).required(),
    id: lib.joi.valid(lib.spaceData.spaceID).required(),
    keys: lib.joi.valid(null).required(),
    modifiedTime: lib.joi.date().required(),
    name: lib.joi.valid(lib.spaceSchemaData.newName).required(),
    organizationId: lib.joi.valid(lib.spaceData.orgID).required(),
    rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required(),
    rowVersion: lib.joi.date().required(),
    shortUrl: lib.joi.valid(lib.spaceSchemaData.patchedShortUrl).required()
  });
  return schema;
}

export function patchSpaceNameSchema() {
  var schema = lib.joi.object().keys({
    createdByAccountId: lib.joi.valid(lib.spaceData.identityID).required(),
    id: lib.joi.valid(lib.spaceData.spaceID).required(),
    keys: lib.joi.valid(null).required(),
    modifiedTime: lib.joi.date().required(),
    name: lib.joi.valid(lib.spaceSchemaData.patchedName).required(),
    organizationId: lib.joi.valid(lib.spaceData.orgID).required(),
    rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required(),
    rowVersion: lib.joi.date().required(),
    shortUrl: lib.joi.valid(lib.spaceSchemaData.patchedShortUrl).required()
  });
  return schema;
}
