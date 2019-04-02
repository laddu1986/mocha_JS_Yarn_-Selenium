import { joi } from '../common';
import constants from 'constants.json';
const propertiesSchema = new Object();
const types = Object.values(constants.TemplateProperties.Types);
const typeKeys = Object.keys(constants.TemplateProperties.Types);
const protoLong = joi.object().keys({
  low: joi.number().required(),
  high: joi.number().required(),
  unsigned: joi.boolean().required()
});

const protoTimeStamp = joi.object().keys({
  seconds: protoLong,
  nanos: joi.number()
});

propertiesSchema.text = joi.object().keys({
  defaultValue: joi.valid('string_default_value').required(),
  rules: joi.array().items(
    joi.object().keys({
      characterCount: joi.object().keys({
        min: joi.object().keys({
          value: joi.valid(10).required()
        }),
        max: joi.object().keys({
          value: joi.valid(10).required()
        }),
        mode: joi.object().keys({
          value: joi.valid(10).required()
        })
      }),
      errorMessage: joi.valid('error').required()
    }),
    joi.object().keys({
      regex: joi.object().keys({
        pattern: joi.valid('Hello').required()
      }),
      errorMessage: joi.valid('error').required()
    }),
    joi.object().keys({
      required: joi.object().keys({}),
      errorMessage: joi.valid('error').required()
    })
  ),
  localizable: joi.valid(true).required()
});

export function getPropertyByIDSchema(templateData, type) {
  let property = propertiesSchema.text;
  return joi.object().keys({
    id: protoLong,
    rowVersion: protoTimeStamp,
    templateId: joi.valid(templateData.template.templateId),
    templateVersionId: protoLong,
    property: joi.object().keys({
      name: joi.only(templateData.template.propertyName).required(),
      key: joi.only(templateData.template.propertyKey).required(),
      appearanceKey: joi.valid(type).required(),
      promptText: joi.valid('prompt_text').required(),
      helpText: joi.valid('help_text').required(),
      [type]: property,
      id: joi
        .string()
        .guid()
        .required()
    })
  });
}

//----------------template tests-------------------------
export function templateSchema() {
  return joi
    .object()
    .keys({
      templateVersionId: protoLong,
      rowVersion: protoTimeStamp
    })
    .required();
}

export function createTemplateSchema() {
  return joi
    .object()
    .keys({
      templateVersionId: protoLong,
      rowVersion: protoTimeStamp,
      templateId: joi.string().required()
    })
    .required();
}

export function templatesSchema(templateData) {
  return joi
    .object()
    .keys({
      templates: joi.array().items(
        joi.object().keys({
          id: joi.valid(templateData.template.templateId).required(),
          key: joi.only(templateData.template.key).required(),
          name: joi.only(templateData.template.name).required(),
          thumbnailUrl: joi.valid('thumbnail_url').required(),
          rowVersion: protoTimeStamp,
          templateVersionId: protoLong
        })
      )
    })
    .required();
}

export function templateByIDSchema(templateData) {
  return joi
    .object()
    .keys({
      template: joi.object().keys({
        id: joi.valid(templateData.template.templateId).required(),
        key: joi.only(templateData.template.key).required(),
        name: joi.only(templateData.template.name).required(),
        thumbnailUrl: joi.valid('thumbnail_url').required(),
        rowVersion: protoTimeStamp,
        templateVersionId: protoLong,
        modifiedAt: protoTimeStamp,
        modifiedBy: joi.valid('abcd').required()
      })
    })
    .required();
}

const textRuleTypesObject = joi.object().keys({
  key: joi.valid('required', 'characterCount', 'regex').required(),
  type: joi.valid('required', 'rangeInt', 'regex').required()
});
const listRuleTypesObject = joi.object().keys({
  key: joi.valid('required', 'valueCount', 'regex').required(),
  type: joi.valid('required', 'rangeInt', 'regex').required()
});
const intRuleTypesObject = joi.object().keys({
  key: joi.valid('required', 'numberRange', 'rangeIntSlider').required(),
  type: joi.valid('required', 'rangeInt', 'Min/Max Slider').required()
});
const dateRuleTypesObject = joi.object().keys({
  key: joi.valid('required', 'dateRange').required(),
  type: joi.valid('required', 'rangeDate').required()
});
const reqRuleTypesObject = joi.object().keys({
  key: joi.valid('required').required(),
  type: joi.valid('required').required()
});
const URLRuleTypesObject = joi.object().keys({
  key: joi.valid('required', 'regex').required(),
  type: joi.valid('required', 'regex').required()
});
function commonAppearanceObject(value) {
  const textApperanceObject = joi.object().keys({
    key: joi.valid(value.toLowerCase()).required(),
    name: joi.valid(value.toLowerCase()).required(),
    isDefault: joi.valid(true).required()
  });
  return textApperanceObject;
}
const intApperanceObject = joi.object().keys({
  key: joi.valid('number', 'slider').required(),
  name: joi.valid('number', 'Slider').required(),
  isDefault: joi
    .alternatives()
    .when('key', { is: 'number', then: joi.valid(true).required() })
    .when('key', { is: 'slider', then: joi.valid(false).required() })
});

export function getPropertySchema() {
  return joi.object().keys({
    templateTypes: joi
      .array()
      .length(3)
      .items(
        joi.object().keys({
          ruleTypes: joi.array(),
          key: joi.valid(0, 1, 2),
          name: joi.valid('Fixed', 'Flexi', 'Collection'),
          iconUrl: joi.valid('FixedIcon', 'FlexiIcon', 'CollectionIcon')
        })
      ),
    propertyTypes: joi
      .array()
      .length(7)
      .items(
        joi.object().keys({
          key: joi.valid(types),
          name: joi.valid(typeKeys),
          showHelpText: joi.valid(true),
          showPromptText: joi
            .alternatives()
            .when('key', {
              is: constants.TemplateProperties.Types.Text,
              then: joi.valid(true).required()
            })
            .when('key', {
              is: constants.TemplateProperties.Types.Integer,
              then: joi.valid(true).required()
            })
            .when('key', {
              is: constants.TemplateProperties.Types.Switch,
              then: joi.valid(false).required()
            })
            .when('key', {
              is: constants.TemplateProperties.Types.Date,
              then: joi.valid(false).required()
            })
            .when('key', {
              is: constants.TemplateProperties.Types.List,
              then: joi.valid(false).required()
            })
            .when('key', {
              is: constants.TemplateProperties.Types.Color,
              then: joi.valid(false).required()
            })
            .when('key', {
              is: constants.TemplateProperties.Types.URL,
              then: joi.valid(true).required()
            }),
          showLocalizable: joi
            .alternatives()
            .when('key', {
              is: constants.TemplateProperties.Types.Text,
              then: joi.valid(true).required()
            })
            .when('key', {
              is: constants.TemplateProperties.Types.Integer,
              then: joi.valid(true).required()
            })
            .when('key', {
              is: constants.TemplateProperties.Types.Date,
              then: joi.valid(true).required()
            })
            .when('key', {
              is: constants.TemplateProperties.Types.List,
              then: joi.valid(true).required()
            })
            .when('key', {
              is: constants.TemplateProperties.Types.URL,
              then: joi.valid(true).required()
            }),
          iconUrl: joi
            .valid('TextIcon', 'IntegerIcon', 'ToggleIcon', 'ColorIcon', 'CalendarIcon', 'ListIcon', 'UrlIcon')
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
            })
            .when('key', {
              is: constants.TemplateProperties.Types.URL,
              then: joi
                .array()
                .items(commonAppearanceObject(constants.TemplateProperties.Types.URL))
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
                .items(listRuleTypesObject)
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
            .when('key', {
              is: constants.TemplateProperties.Types.URL,
              then: joi
                .array()
                .items(URLRuleTypesObject)
                .required()
            })
        })
      )
  });
}

//********************* new ********************* */

export function addPropertySchema(templateData) {
  return joi.object().keys({
    propertyId: joi.only(templateData.template.propertyId).required(),
    templateVersionId: protoLong,
    rowVersion: protoTimeStamp
  });
}

export function renamePropertySchema() {
  return joi.object().keys({
    templateVersionId: protoLong,
    rowVersion: protoTimeStamp
  });
}
