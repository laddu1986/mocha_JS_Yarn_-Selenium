import { spaceKeyData, joi } from '../../common';
import * as Constants from 'data/constants.json';

export const createKeySchema = joi.object().keys({
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

const schemaObject = joi.object().keys({
  value: joi.valid(spaceKeyData.spaceKeyValue).required(),
  rowVersion: joi.date().required(),
  rowStatus: joi.valid(Constants.APIKeyStatus.Active).required()
});
const keysSchemaObject = joi.object().keys({
  keys: joi.array().items(schemaObject),
  resourceId: joi.valid(spaceKeyData.spaceID).required(),
  resourceType: joi.valid('Space').required()
});
export const getKeysBySpaceIdSchema = joi.array().items(keysSchemaObject);

export const revokeKeyBySpaceIdAndRowVersionSchema = joi.object().keys({
  value: joi.valid(spaceKeyData.spaceKeyValue).required(),
  rowVersion: joi.date().required(),
  rowStatus: joi.valid(Constants.APIKeyStatus.Revoked).required(),
  resourceId: joi.valid(spaceKeyData.spaceID).required(),
  resourceType: joi.valid('Space').required(),
  resourceName: joi.valid(null).required()
});

export const reactivateKeyBySpaceIdAndRowVersionSchema = joi.object().keys({
  value: joi.valid(spaceKeyData.spaceKeyValue).required(),
  rowVersion: joi.date().required(),
  rowStatus: joi.valid(Constants.APIKeyStatus.Active).required(),
  resourceId: joi.valid(spaceKeyData.spaceID).required(),
  resourceType: joi.valid('Space').required(),
  resourceName: joi.valid(null).required()
});

export const deleteKeyBySpaceIdAndRowVersionSchema = joi.object().keys({
  value: joi.valid(spaceKeyData.spaceKeyValue).required(),
  rowVersion: joi.date().required(),
  rowStatus: joi.valid(Constants.APIKeyStatus.PendingDelete.replace(/\s/g, '')).required(),
  resourceId: joi.valid(spaceKeyData.spaceID).required(),
  resourceType: joi.valid('Space').required(),
  resourceName: joi.valid(null).required()
});
