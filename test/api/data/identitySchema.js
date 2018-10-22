import { joi, identitySchemaData, identityData } from '../../common';

export const postIdentitySchema = joi.object().keys({
  fullName: joi.valid(identitySchemaData.name).required(),
  email: joi.valid(identitySchemaData.email).required(),
  id: joi
    .string()
    .guid()
    .required()
});

export const getIdentitySchema = joi.object().keys({
  fullName: joi.valid(identitySchemaData.name).required(),
  email: joi.valid(identitySchemaData.email).required(),
  id: joi.valid(identityData.identityID).required()
});
