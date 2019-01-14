import { joi } from '../common';
import constants from 'constants.json';

const types = Object.keys(constants.TemplateProperties.Types).map(value => constants.TemplateProperties.Types[value]);

const protoLong = joi.object().keys({
  low: joi.number(),
  high: joi.number(),
  unsigned: joi.boolean()
});

const protoTimeStamp = joi.object().keys({
  seconds: protoLong,
  nanos: joi.number()
});

const textProp = joi.object().keys({
  defaultValue: 'default_value_text',
  rules: joi.array().items(
    joi.object().keys({
      required: joi.object().keys({
        isRequired: true
      }),
      errorMessage: 'error_message_text'
    })
  )
});

function propertiesSchema(templateData) {
  if (templateData.template.properties !== undefined) {
    let names = templateData.template.properties.map(property => property.name);
    let keys = templateData.template.properties.map(property => property.key);
    return joi.array().items(
      joi.object().keys({
        name: joi.valid(names),
        key: joi.valid(keys),
        typeKey: joi.valid(types),
        text: textProp,
        appearanceKey: joi.valid('appearance_key_text'),
        promptText: joi.valid('prompt_text'),
        localizable: joi.valid(true)
      })
    );
  } else {
    return joi.array();
  }
}

export function templateSchema(templateData) {
  return joi
    .object()
    .keys({
      id: protoLong,
      key: joi.only(templateData.template.key),
      name: joi.only(templateData.template.name),
      thumbnailUrl: joi.valid('thumbnail_url_text'),
      rowVersion: protoTimeStamp,
      properties: propertiesSchema(templateData)
    })
    .required();
}

export function templatesSchema(templateData) {
  return joi.object().keys({
    experienceTemplates: joi.array().items(templateSchema(templateData))
  });
}
