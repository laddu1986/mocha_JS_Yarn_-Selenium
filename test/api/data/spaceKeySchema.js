import * as lib from '../../common';
import * as Constants from 'data/constants.json';

export const createKeySchema = lib.joi.object().keys({
  value: lib.joi
    .string()
    .uuid()
    .required(),
  rowVersion: lib.joi.date().required(),
  rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required(),
  resourceId: lib.joi.valid(lib.spaceKeyData.spaceID).required(),
  resourceType: lib.joi.valid('Space').required(),
  resourceName: lib.joi.valid(null).required()
});

const schemaObject = lib.joi.object().keys({
  value: lib.joi.valid(lib.spaceKeyData.spaceKeyValue).required(),
  rowVersion: lib.joi.date().required(),
  rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required()
});
const keysSchemaObject = lib.joi.object().keys({
  keys: lib.joi.array().items(schemaObject),
  resourceId: lib.joi.valid(lib.spaceKeyData.spaceID).required(),
  resourceType: lib.joi.valid('Space').required()
});
export const getKeysBySpaceIdSchema = lib.joi.array().items(keysSchemaObject);

export const revokeKeyBySpaceIdAndRowVersionSchema = lib.joi.object().keys({
  value: lib.joi.valid(lib.spaceKeyData.spaceKeyValue).required(),
  rowVersion: lib.joi.date().required(),
  rowStatus: lib.joi.valid(Constants.APIKeyStatus.Revoked).required(),
  resourceId: lib.joi.valid(lib.spaceKeyData.spaceID).required(),
  resourceType: lib.joi.valid('Space').required(),
  resourceName: lib.joi.valid(null).required()
});

export const reactivateKeyBySpaceIdAndRowVersionSchema = lib.joi.object().keys({
  value: lib.joi.valid(lib.spaceKeyData.spaceKeyValue).required(),
  rowVersion: lib.joi.date().required(),
  rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required(),
  resourceId: lib.joi.valid(lib.spaceKeyData.spaceID).required(),
  resourceType: lib.joi.valid('Space').required(),
  resourceName: lib.joi.valid(null).required()
});

export const deleteKeyBySpaceIdAndRowVersionSchema = lib.joi.object().keys({
  value: lib.joi.valid(lib.spaceKeyData.spaceKeyValue).required(),
  rowVersion: lib.joi.date().required(),
  rowStatus: lib.joi.valid(Constants.APIKeyStatus.PendingDelete.replace(/\s/g, '')).required(),
  resourceId: lib.joi.valid(lib.spaceKeyData.spaceID).required(),
  resourceType: lib.joi.valid('Space').required(),
  resourceName: lib.joi.valid(null).required()
});
