import { joi } from '../common';
import * as Constants from 'constants.json';

export function createKeySchema(spaceKeyData) {
  return joi.object().keys({
    value: joi
      .string()
      .uuid()
      .required(),
    rowVersion: joi.date().required(),
    rowStatus: joi.valid(Constants.APIKeyStatus.Active).required(),
    resourceId: joi.valid(spaceKeyData.spaceID).required(),
    resourceType: joi.valid('Space').required(),
    resourceName: joi.valid(null).required()
  });
}

function spaceKeySchema(spaceKeyData) {
  return joi.object().keys({
    value: joi.valid(spaceKeyData.spaceKeyValue).required(),
    rowVersion: joi.date().required(),
    rowStatus: joi.valid(Constants.APIKeyStatus.Active).required()
  });
}

function spaceKeysSchema(spaceKeyData) {
  return joi.object().keys({
    keys: joi.array().items(spaceKeySchema(spaceKeyData)),
    resourceId: joi.valid(spaceKeyData.spaceID).required(),
    resourceType: joi.valid('Space').required()
  });
}

export function getKeysBySpaceIdSchema(spaceKeyData) {
  return joi.array().items(spaceKeysSchema(spaceKeyData));
}

export function revokeKeyBySpaceIdAndRowVersionSchema(spaceKeyData) {
  return joi.object().keys({
    value: joi.valid(spaceKeyData.spaceKeyValue).required(),
    rowVersion: joi.date().required(),
    rowStatus: joi.valid(Constants.APIKeyStatus.Revoked).required(),
    resourceId: joi.valid(spaceKeyData.spaceID).required(),
    resourceType: joi.valid('Space').required(),
    resourceName: joi.valid(null).required()
  });
}

export function reactivateKeyBySpaceIdAndRowVersionSchema(spaceKeyData) {
  return joi.object().keys({
    value: joi.valid(spaceKeyData.spaceKeyValue).required(),
    rowVersion: joi.date().required(),
    rowStatus: joi.valid(Constants.APIKeyStatus.Active).required(),
    resourceId: joi.valid(spaceKeyData.spaceID).required(),
    resourceType: joi.valid('Space').required(),
    resourceName: joi.valid(null).required()
  });
}

export function deleteKeyBySpaceIdAndRowVersionSchema(spaceKeyData) {
  return joi.object().keys({
    value: joi.valid(spaceKeyData.spaceKeyValue).required(),
    rowVersion: joi.date().required(),
    rowStatus: joi.valid(Constants.APIKeyStatus.PendingDelete.replace(/\s/g, '')).required(),
    resourceId: joi.valid(spaceKeyData.spaceID).required(),
    resourceType: joi.valid('Space').required(),
    resourceName: joi.valid(null).required()
  });
}
