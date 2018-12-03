import { joi } from '../common';
import * as Constants from 'constants.json';

export function postSpaceByOrganizationIdSchema(spaceData) {
  return joi.object().keys({
    createdByAccountId: joi.valid(spaceData.identityID).required(),
    id: joi
      .string()
      .uuid()
      .required(),
    keys: joi.valid(null).required(),
    modifiedTime: joi.valid(null).required(),
    name: joi.valid(spaceData.spaceName).required(),
    organizationId: joi.valid(spaceData.orgID).required(),
    rowStatus: joi.valid(Constants.APIKeyStatus.Active).required(),
    rowVersion: joi.date().required(),
    shortUrl: joi.valid(spaceData.spaceShortUrl).required()
  });
}

export function getSpacesByOrganizationIdSchema(spaceData) {
  const spaceSchema = joi.object().keys({
    createdByAccountId: joi.valid(spaceData.identityID).required(),
    id: joi.valid(spaceData.spaceID).required(),
    keys: joi.valid(null).required(),
    modifiedTime: joi.valid(null).required(),
    name: joi.valid(spaceData.spaceName).required(),
    organizationId: joi.valid(spaceData.orgID).required(),
    rowStatus: joi.valid(Constants.APIKeyStatus.Active).required(),
    rowVersion: joi.date().required(),
    shortUrl: joi.valid(spaceData.spaceShortUrl).required()
  });
  return joi
    .array()
    .items(spaceSchema)
    .required();
}

export function updateSpaceSchema(spaceData) {
  return joi.object().keys({
    createdByAccountId: joi.valid(spaceData.identityID).required(),
    id: joi.valid(spaceData.spaceID).required(),
    keys: joi.valid(null).required(),
    modifiedTime: joi.date().required(),
    name: joi.valid(spaceData.spaceNewName).required(),
    organizationId: joi.valid(spaceData.orgID).required(),
    rowStatus: joi.valid(Constants.APIKeyStatus.Active).required(),
    rowVersion: joi.date().required(),
    shortUrl: joi.valid(spaceData.spaceNewShortUrl).required()
  });
}

export function getSpaceByOrgIdAndSpaceIdSchema(spaceData) {
  return joi.object().keys({
    createdByAccountId: joi.valid(spaceData.identityID).required(),
    id: joi.valid(spaceData.spaceID).required(),
    keys: joi.valid(null).required(),
    modifiedTime: joi.date().required(),
    name: joi.valid(spaceData.spaceNewName).required(),
    organizationId: joi.valid(spaceData.orgID).required(),
    rowStatus: joi.valid(Constants.APIKeyStatus.Active).required(),
    rowVersion: joi.date().required(),
    shortUrl: joi.valid(spaceData.spaceNewShortUrl).required()
  });
}

export function patchSpaceShortUrlSchema(spaceData) {
  var schema = joi.object().keys({
    createdByAccountId: joi.valid(spaceData.identityID).required(),
    id: joi.valid(spaceData.spaceID).required(),
    keys: joi.valid(null).required(),
    modifiedTime: joi.date().required(),
    name: joi.valid(spaceData.spaceNewName).required(),
    organizationId: joi.valid(spaceData.orgID).required(),
    rowStatus: joi.valid(Constants.APIKeyStatus.Active).required(),
    rowVersion: joi.date().required(),
    shortUrl: joi.valid(spaceData.spacePatchedShortUrl).required()
  });
  return schema;
}

export function patchSpaceNameSchema(spaceData) {
  var schema = joi.object().keys({
    createdByAccountId: joi.valid(spaceData.identityID).required(),
    id: joi.valid(spaceData.spaceID).required(),
    keys: joi.valid(null).required(),
    modifiedTime: joi.date().required(),
    name: joi.valid(spaceData.spacePatchedName).required(),
    organizationId: joi.valid(spaceData.orgID).required(),
    rowStatus: joi.valid(Constants.APIKeyStatus.Active).required(),
    rowVersion: joi.date().required(),
    shortUrl: joi.valid(spaceData.spacePatchedShortUrl).required()
  });
  return schema;
}
