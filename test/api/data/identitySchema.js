import { joi } from '../common';

export function postIdentitySchema(identityData) {
  var schema = joi.object().keys({
    fullName: joi.valid(identityData.identityFullname).required(),
    email: joi.valid(identityData.identityEmail).required(),
    id: joi
      .string()
      .guid()
      .required()
  });
  return schema;
}

export function getIdentitySchema(identityData) {
  var schema = joi.object().keys({
    fullName: joi.valid(identityData.identityFullname).required(),
    email: joi.valid(identityData.identityEmail).required(),
    id: joi.valid(identityData.identityId).required()
  });
  return schema;
}
