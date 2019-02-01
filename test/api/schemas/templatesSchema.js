import { joi } from '../common';
import constants from 'constants.json';

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

function textPropertySchema() {
  return joi.object().keys({
    defaultValue: joi.valid('default_value_text').required(),
    localizable: joi.valid(true).required(),
    rules: joi.array().items(
      joi.object().keys({
        characterCount: joi.object().keys({
          min: joi.valid(1).required(),
          max: joi.valid(10).required(),
          mode: joi.valid(10).required()
        }),
        errorMessage: joi.valid('text_range_error_message').required()
      }),
      joi.object().keys({
        regex: joi.object().keys({
          pattern: joi.valid('pattern_text').required()
        }),
        errorMessage: joi.valid('text_regex_error_message').required()
      }),
      joi.object().keys({
        required: joi.object().keys({
          isRequired: joi.valid(true).required()
        }),
        errorMessage: joi.valid('text_required_error_message').required()
      })
    )
  });
}

function boolPropertiesSchema() {
  return joi.object().keys({
    defaultValue: joi.valid(true).required(),
    rules: joi.array().items(
      joi.object().keys({
        required: joi.object().keys({
          isRequired: joi.valid(true).required()
        }),
        errorMessage: joi.valid('bool_required_error_message').required()
      })
    )
  });
}

function integerPropertiesSchema() {
  return joi.object().keys({
    defaultValue: joi.valid(10).required(),
    rules: joi.array().items(
      joi.object().keys({
        numberRange: joi.object().keys({
          min: joi.valid(1).required(),
          max: joi.valid(10).required(),
          mode: joi.valid(10).required()
        }),
        errorMessage: joi.valid('int_rangeint_error_message_text').required()
      }),
      joi.object().keys({
        numberRangeSlider: joi.object().keys({
          min: joi.valid(1).required(),
          max: joi.valid(10).required(),
          mode: joi.valid(10).required(),
          increment: joi.valid(5).required()
        }),
        errorMessage: joi.valid('int_rangeIntSlider_error_message_text').required()
      }),
      joi.object().keys({
        required: joi.object().keys({
          isRequired: joi.valid(true).required()
        }),
        errorMessage: joi.valid('int_required_error_message_text').required()
      })
    ),
    localizable: joi.valid(true).required()
  });
}

function datePropertiesSchema() {
  return joi.object().keys({
    defaultValue: protoTimeStamp,
    rules: joi.array().items(
      joi.object().keys({
        dateRange: joi.object().keys({
          min: protoTimeStamp,
          max: protoTimeStamp,
          mode: joi.valid(10).required()
        }),
        errorMessage: joi.valid('date_range_error_message_text').required()
      }),
      joi.object().keys({
        required: joi.object().keys({
          isRequired: joi.valid(true).required()
        }),
        errorMessage: joi.valid('date_req_error_message').required()
      })
    ),
    localizable: joi.valid(true).required()
  });
}

function colorPropertiesSchema() {
  return joi.object().keys({
    defaultValue: joi.object().keys({
      key: joi.valid('key_of_color').required(),
      value: joi.valid('value_of_color').required(),
      opacity: joi.valid(100).required()
    }),
    rules: joi.array().items(
      joi.object().keys({
        required: joi.object().keys({
          isRequired: joi.valid(true).required()
        }),
        errorMessage: joi.valid('color_error_message').required()
      })
    )
  });
}

function listPropertiesSchema() {
  return joi.object().keys({
    defaultValue: joi.object().keys({
      value: joi.array().items('1st_val')
    }),
    localizable: joi.valid(true).required(),
    rules: joi.array().items(
      joi.object().keys({
        valueCount: joi.object().keys({
          min: joi.valid(10).required(),
          max: joi.valid(10).required(),
          mode: joi.valid(10).required()
        }),
        errorMessage: joi.valid('list_range_err_msg').required()
      }),
      joi.object().keys({
        regex: joi.object().keys({
          pattern: joi.valid('regex_pattern').required()
        }),
        errorMessage: joi.valid('list_regex_error_msg').required()
      }),
      joi.object().keys({
        required: joi.object().keys({
          isRequired: joi.valid(true).required()
        }),
        errorMessage: joi.valid('list_req_err_msg').required()
      })
    )
  });
}

export function templatePropertySchema(templateData, type) {
  let property;
  switch (type) {
    case constants.TemplateProperties.Types.Text:
      property = textPropertySchema();
      break;
    case constants.TemplateProperties.Types.Switch:
      property = boolPropertiesSchema();
      break;
    case constants.TemplateProperties.Types.Integer:
      property = integerPropertiesSchema();
      break;
    case constants.TemplateProperties.Types.Date:
      property = datePropertiesSchema();
      break;
    case constants.TemplateProperties.Types.Color:
      property = colorPropertiesSchema();
      break;
    case constants.TemplateProperties.Types.List:
      property = listPropertiesSchema();
      break;
  }
  return joi.object().keys({
    id: protoLong,
    key: joi.only(templateData.template.key).required(),
    name: joi.only(templateData.template.name).required(),
    thumbnailUrl: joi.valid('thumbnail_url').required(),
    rowVersion: protoTimeStamp,
    properties: joi.array().items(
      joi.object().keys({
        name: joi.only(templateData.template.properties[0].name).required(),
        key: joi.only(templateData.template.properties[0].key).required(),
        appearanceKey: joi.valid('appearance_key_text').required(),
        promptText: joi.valid('prompt_text').required(),
        helpText: joi.valid('help_text').required(),
        [type]: property
      })
    )
  });
}

export function deletedTemplatePropertySchema(templateData) {
  return joi.object().keys({
    id: protoLong,
    key: joi.only(templateData.template.key).required(),
    name: joi.only(templateData.template.name).required(),
    thumbnailUrl: joi.valid('thumbnail_url').required(),
    rowVersion: protoTimeStamp
  });
}
//----------------template tests-------------------------
export function templateSchema(templateData) {
  return joi
    .object()
    .keys({
      id: protoLong,
      key: joi.only(templateData.template.key).required(),
      name: joi.only(templateData.template.name).required(),
      rowVersion: protoTimeStamp
    })
    .required();
}

export function templatesSchema(templateData) {
  return joi
    .object()
    .keys({
      experienceTemplates: joi.array().items(
        joi.object().keys({
          id: protoLong,
          key: joi.only(templateData.template.key).required(),
          name: joi.only(templateData.template.name).required(),
          rowVersion: protoTimeStamp
        })
      )
    })
    .required();
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
            }),
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
