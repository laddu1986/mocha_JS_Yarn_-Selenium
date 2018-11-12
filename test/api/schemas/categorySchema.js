import { joi } from '../common';

export const schemaCategory = joi.object().keys({
  id: joi
    .number()
    .integer()
    .required(),
  label: joi.string().optional(),
  isDefault: joi.boolean().optional()
});

export const schemaCategories = joi.object().keys({
  categories: joi.array().items(schemaCategory)
});
