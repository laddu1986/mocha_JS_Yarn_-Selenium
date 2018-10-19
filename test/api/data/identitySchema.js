import * as lib from '../../common';

export const postIdentitySchema = lib.joi.object().keys({
  fullName: lib.joi.valid(lib.identitySchemaData.name).required(),
  email: lib.joi.valid(lib.identitySchemaData.email).required(),
  id: lib.joi
    .string()
    .guid()
    .required()
});

export const getIdentitySchema = lib.joi.object().keys({
  fullName: lib.joi.valid(lib.identitySchemaData.name).required(),
  email: lib.joi.valid(lib.identitySchemaData.email).required(),
  id: lib.joi.valid(lib.identityData.identityID).required()
});
