import { joi } from '../common';

export const identityStateSchema = joi.object().keys({
  values: joi.required()
});

export const patchStateSchema = joi.object().keys({
  values: joi.object().keys({
    additionalProp1: joi.valid('1').required(),
    additionalProp2: joi.valid('2').required(),
    additionalProp3: joi.valid('3').required()
  })
});
