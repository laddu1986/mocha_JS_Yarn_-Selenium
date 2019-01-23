import { joi } from '../common';
import constants from 'constants.json';

const types = Object.values(constants.TemplateProperties.Types);
const typeKeys = Object.keys(constants.TemplateProperties.Types);
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
const textRuleTypesObject = joi.object().keys({
  key: joi.valid('required', 'rangeInt', 'regex').required(),
  name: joi.valid('Required', 'Min/Max', 'Regex').required()
});
const intRuleTypesObject = joi.object().keys({
  key: joi.valid('required', 'rangeInt', 'rangeIntSlider').required(),
  name: joi.valid('Required', 'Min/Max', 'Min/Max Slider').required()
});
const dateRuleTypesObject = joi.object().keys({
  key: joi.valid('required', 'rangeDate').required(),
  name: joi.valid('Required', 'Min/Max Date').required()
});
const reqRuleTypesObject = joi.object().keys({
  key: joi.valid('required').required(),
  name: joi.valid('Required').required()
});
function commonAppearanceObject(value) {
  let nameVal = value[0].toUpperCase() + value.substring(1);
  const textApperanceObject = joi.object().keys({
    key: joi.valid(value.toLowerCase()).required(),
    name: joi.valid(nameVal).required(),
    isDefault: joi.valid(true).required()
  });
  return textApperanceObject;
}
const intApperanceObject = joi.object().keys({
  key: joi.valid('number', 'slider').required(),
  name: joi.valid('Number', 'Slider').required(),
  isDefault: joi
    .alternatives()
    .when('key', { is: 'number', then: joi.valid(true).required() })
    .when('key', { is: 'slider', then: joi.valid(false).required() })
});

export function getPropertySchema() {
  return joi.object().keys({
    propertyTypes: joi
      .array()
      .length(6)
      .items(
        joi.object().keys({
          key: joi.valid(types),
          name: joi.valid(typeKeys),
          iconUrl: joi
            .valid('TextIcon', 'IntegerIcon', 'ToggleIcon', 'ColorIcon', 'CalendarIcon', 'ListIcon')
            .required(),
          appearances: joi
            .alternatives()
            .when('key', {
              is: constants.TemplateProperties.Types.Text,
              then: joi
                .array()
                .items(commonAppearanceObject(constants.TemplateProperties.Types.Text))
                .required()
            })
            .when('key', {
              is: constants.TemplateProperties.Types.Switch,
              then: joi
                .array()
                .items(commonAppearanceObject(Object.keys(constants.TemplateProperties.Types)[1]))
                .required()
            })
            .when('key', {
              is: constants.TemplateProperties.Types.Integer,
              then: joi
                .array()
                .items(intApperanceObject)
                .required()
            })
            .when('key', {
              is: constants.TemplateProperties.Types.Color,
              then: joi
                .array()
                .items(commonAppearanceObject(constants.TemplateProperties.Types.Color))
                .required()
            })
            .when('key', {
              is: constants.TemplateProperties.Types.List,
              then: joi
                .array()
                .items(commonAppearanceObject(constants.TemplateProperties.Types.List))
                .required()
            })
            .when('key', {
              is: constants.TemplateProperties.Types.Date,
              then: joi
                .array()
                .items(commonAppearanceObject(constants.TemplateProperties.Types.Date))
                .required()
            }),
          ruleTypes: joi
            .alternatives()
            .when('key', {
              is: constants.TemplateProperties.Types.Text,
              then: joi
                .array()
                .items(textRuleTypesObject)
                .required()
            })
            .when('key', {
              is: constants.TemplateProperties.Types.List,
              then: joi
                .array()
                .items(textRuleTypesObject)
                .required()
            })
            .when('key', {
              is: constants.TemplateProperties.Types.Integer,
              then: joi
                .array()
                .items(intRuleTypesObject)
                .required()
            })
            .when('key', {
              is: constants.TemplateProperties.Types.Color,
              then: joi
                .array()
                .items(reqRuleTypesObject)
                .required()
            })
            .when('key', {
              is: constants.TemplateProperties.Types.Switch,
              then: joi
                .array()
                .items(reqRuleTypesObject)
                .required()
            })
            .when('key', {
              is: constants.TemplateProperties.Types.Date,
              then: joi
                .array()
                .items(dateRuleTypesObject)
                .required()
            })
        })
      )
  });
}
