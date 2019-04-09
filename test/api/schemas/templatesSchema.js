import { joi } from '../common';
import Constants from 'constants.json';
const types = Object.values(Constants.TemplateProperties.Types);
const typeKeys = Object.keys(Constants.TemplateProperties.Types);
const protoLong = joi.object().keys({
  low: joi.number().required(),
  high: joi.number().required(),
  unsigned: joi.boolean().required()
});

const protoTimeStamp = joi.object().keys({
  seconds: protoLong,
  nanos: joi.number()
});

const regex = joi.object().keys({
  [Constants.TemplateProperties.Rules.Regex]: joi.object().keys({
    pattern: joi.valid('Hello').required()
  }),
  errorMessage: joi.valid('error').required()
});

const req = joi.object().keys({
  [Constants.TemplateProperties.Rules.Required]: joi.object().keys({}),
  errorMessage: joi.valid('error').required()
});

function rangeRule(type) {
  let rulename;
  switch (type) {
    case Constants.TemplateProperties.Types.Text:
      rulename = Constants.TemplateProperties.Rules.CharacterCount;
      break;
    case Constants.TemplateProperties.Types.Integer:
      rulename = Constants.TemplateProperties.Rules.NumberRange;
      break;
  }
  const char = joi.object().keys({
    [rulename]: joi.object().keys({
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
  });
  return char;
}

function propertiesSchema(type) {
  let defaultVal, ruleValues;
  switch (type) {
    case Constants.TemplateProperties.Types.Text:
      defaultVal = joi.valid('string_default_value').required();
      ruleValues = joi.array().items(
        rangeRule(type), regex, req
      )
      break;
    case Constants.TemplateProperties.Types.Integer:
      defaultVal = joi.object().keys({
        value: joi.valid(10).required()
      });
      ruleValues = joi.array().items(
        rangeRule(type)
      )
      break;
  }
  const properties = joi.object().keys({
    [Constants.TemplateProperties.Rules.DefaultValue]: defaultVal,
    rules: ruleValues,
    [Constants.TemplateProperties.Rules.Localizable]: joi.valid(true).required()
  })
  return properties;
}

export function getPropertyByIDSchema(templateData, type) {
  return joi.object().keys({
    id: protoLong,
    rowVersion: protoTimeStamp,
    templateId: joi.valid(templateData.template.templateId),
    templateVersionId: protoLong,
    property: joi.object().keys({
      name: joi.only(templateData.template.propertyName).required(),
      key: joi.only(templateData.template.propertyKey).required(),
      appearanceKey: joi.valid(type, 'number').required(),
      promptText: joi.valid('prompt_text').required(),
      helpText: joi.valid('help_text').required(),
      [type]: propertiesSchema(type),
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
  key: joi.valid(Constants.TemplateProperties.Rules.Required, Constants.TemplateProperties.Rules.CharacterCount, Constants.TemplateProperties.Rules.Regex).required(),
  type: joi.valid(Constants.TemplateProperties.Rules.Required, "rangeInt", Constants.TemplateProperties.Rules.Regex).required()
});
const listRuleTypesObject = joi.object().keys({
  key: joi.valid(Constants.TemplateProperties.Rules.Required, Constants.TemplateProperties.Rules.ValueCount, Constants.TemplateProperties.Rules.Regex).required(),
  type: joi.valid(Constants.TemplateProperties.Rules.Required, "rangeInt", Constants.TemplateProperties.Rules.Regex).required()
});
const intRuleTypesObject = joi.object().keys({
  key: joi.valid(Constants.TemplateProperties.Rules.Required, Constants.TemplateProperties.Rules.NumberRange).required(),
  type: joi.valid(Constants.TemplateProperties.Rules.Required, "rangeInt").required()
});
const dateRuleTypesObject = joi.object().keys({
  key: joi.valid(Constants.TemplateProperties.Rules.Required, Constants.TemplateProperties.Rules.DateRange).required(),
  type: joi.valid(Constants.TemplateProperties.Rules.Required, "rangeDate").required()
});
const reqRuleTypesObject = joi.object().keys({
  key: joi.valid(Constants.TemplateProperties.Rules.Required).required(),
  type: joi.valid(Constants.TemplateProperties.Rules.Required).required()
});
const URLRuleTypesObject = joi.object().keys({
  key: joi.valid(Constants.TemplateProperties.Rules.Required, Constants.TemplateProperties.Rules.Regex).required(),
  type: joi.valid(Constants.TemplateProperties.Rules.Required, Constants.TemplateProperties.Rules.Regex).required()
});
const SelectRuleTypesObject = joi.object().keys({
  key: joi.valid(Constants.TemplateProperties.Rules.Required, Constants.TemplateProperties.Rules.AllowedValues).required(),
  type: joi.valid(Constants.TemplateProperties.Rules.Required, Constants.TemplateProperties.Rules.AllowedValues).required()
});

function commonAppearanceObject(value) {
  const textApperanceObject = joi.object().keys({
    key: joi.valid(value.toLowerCase()).required(),
    name: joi.valid(value.toLowerCase()).required(),
    isDefault: joi.valid(true).required()
  })
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

const selectAppearanceObject = joi.object().keys({
  key: joi.valid('dropdown', 'radio').required(),
  name: joi.valid('dropdown', 'radio').required(),
  isDefault: joi
    .alternatives()
    .when('key', { is: 'dropdown', then: joi.valid(true).required() })
});
const ExperienceTemplatesKeys = Object.keys(Constants.Experience.Types);
const ExperienceTemplatesValues = Object.values(Constants.Experience.Types);
export function getPropertySchema() {
  return joi.object().keys({
    templateTypes: joi
      .array()
      .length(3)
      .items(
        joi.object().keys({
          ruleTypes: joi.array(),
          key: joi.valid(ExperienceTemplatesValues),
          name: joi.valid(ExperienceTemplatesKeys),
          iconUrl: joi.valid('FixedIcon', 'FlexiIcon', 'CollectionIcon')
        })
      ),
    propertyTypes: joi
      .array()
      .length(8)
      .items(
        joi.object().keys({
          key: joi.valid(types),
          name: joi.valid(typeKeys),
          showHelpText: joi.valid(true),
          showPromptText: joi
            .alternatives()
            .when('key', {
              is: Constants.TemplateProperties.Types.Text,
              then: joi.valid(true).required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.Integer,
              then: joi.valid(true).required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.Switch,
              then: joi.valid(false).required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.Date,
              then: joi.valid(false).required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.List,
              then: joi.valid(false).required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.Color,
              then: joi.valid(false).required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.URL,
              then: joi.valid(true).required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.Select,
              then: joi.valid(true).required()
            }),
          showLocalizable: joi
            .alternatives()
            .when('key', {
              is: Constants.TemplateProperties.Types.Text,
              then: joi.valid(true).required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.Integer,
              then: joi.valid(false).required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.Date,
              then: joi.valid(true).required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.List,
              then: joi.valid(true).required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.URL,
              then: joi.valid(true).required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.Color,
              then: joi.valid(false).required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.Switch,
              then: joi.valid(false).required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.Select,
              then: joi.valid(false).required()
            }),
          iconUrl: joi
            .valid('TextIcon', 'IntegerIcon', 'ToggleIcon', 'ColorIcon', 'CalendarIcon', 'TagIcon', 'UrlIcon', 'ListIcon')
            .required(),
          appearances: joi
            .alternatives()
            .when('key', {
              is: Constants.TemplateProperties.Types.Text,
              then: joi
                .array()
                .items(commonAppearanceObject(Constants.TemplateProperties.Types.Text))
                .required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.Switch,
              then: joi
                .array()
                .items(commonAppearanceObject(Object.keys(Constants.TemplateProperties.Types)[1]))
                .required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.Integer,
              then: joi
                .array()
                .items(intApperanceObject)
                .required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.Color,
              then: joi
                .array()
                .items(commonAppearanceObject(Constants.TemplateProperties.Types.Color))
                .required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.List,
              then: joi
                .array()
                .items(commonAppearanceObject(Constants.TemplateProperties.Types.List))
                .required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.Date,
              then: joi
                .array()
                .items(commonAppearanceObject(Constants.TemplateProperties.Types.Date))
                .required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.URL,
              then: joi
                .array()
                .items(commonAppearanceObject(Constants.TemplateProperties.Types.URL))
                .required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.Select,
              then: joi
                .array()
                .items(selectAppearanceObject)
                .required()
            }),
          ruleTypes: joi
            .alternatives()
            .when('key', {
              is: Constants.TemplateProperties.Types.Text,
              then: joi
                .array()
                .items(textRuleTypesObject)
                .required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.List,
              then: joi
                .array()
                .items(listRuleTypesObject)
                .required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.Integer,
              then: joi
                .array()
                .items(intRuleTypesObject)
                .required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.Color,
              then: joi
                .array()
                .items(reqRuleTypesObject)
                .required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.Switch,
              then: joi
                .array()
                .items(reqRuleTypesObject)
                .required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.Date,
              then: joi
                .array()
                .items(dateRuleTypesObject)
                .required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.URL,
              then: joi
                .array()
                .items(URLRuleTypesObject)
                .required()
            })
            .when('key', {
              is: Constants.TemplateProperties.Types.Select,
              then: joi
                .array()
                .items(SelectRuleTypesObject)
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
