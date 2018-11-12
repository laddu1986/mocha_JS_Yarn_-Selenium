import { joi } from '../common';

export function postIdentitySchema(identityData) {
  return joi.object().keys({
    fullName: joi.valid(identityData.identityFullname).required(),
    email: joi.valid(identityData.identityEmail).required(),
    id: joi
      .string()
      .guid()
      .required()
  });
}

export function getIdentitySchema(identityData) {
  return joi.object().keys({
    fullName: joi.valid(identityData.identityFullname).required(),
    email: joi.valid(identityData.identityEmail).required(),
    id: joi.valid(identityData.identityID).required()
  });
}
