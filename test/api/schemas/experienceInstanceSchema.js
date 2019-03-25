import { joi } from '../common';
import * as Constants from '../constants.json';

const protoLong = joi.object().keys({
  low: joi.number().required(),
  high: joi.number().required(),
  unsigned: joi.boolean().required()
});

const protoTimeStamp = joi.object().keys({
  seconds: protoLong,
  nanos: joi.number()
});

const instanceProperties = new Object();

instanceProperties.int = joi.object().keys({
  numberValue: joi.number(),
  kind: joi.valid('numberValue')
});

instanceProperties.date = joi.object().keys({
  stringValue: joi.date().iso(),
  kind: joi.valid('stringValue')
});

instanceProperties.bool = joi.object().keys({
  boolValue: joi.bool(),
  kind: joi.valid('boolValue')
});

instanceProperties.text = joi.object().keys({
  stringValue: joi.string(),
  kind: joi.valid('stringValue')
});

instanceProperties.color = joi.object().keys({
  structValue: joi.object().keys({
    fields: joi.object().keys({
      value: joi.object().keys({
        stringValue: joi.string(),
        kind: joi.valid('stringValue')
      }),
      opacity: joi.object().keys({
        numberValue: joi.valid(100),
        kind: joi.valid('numberValue')
      })
    })
  })
});

instanceProperties.list = joi.object().keys({
  listValue: joi.object().keys({
    values: joi.array().items(
      joi.object().keys({
        stringValue: joi.string(),
        kind: joi.valid('stringValue')
      })
    )
  })
});

const properties = Object.values(instanceProperties);

const updatedExperience = joi.object().keys({
  experienceId: joi.string(),
  rowVersion: protoTimeStamp
});

export const propertiesSchema = joi.object().keys({
  localeCode: joi.string(),
  properties: joi.object().keys({
    fields: joi.object().pattern(/^/, joi.alternatives().try(properties))
  }),
  rowVersion: protoTimeStamp
});

export const scenarioSchema = joi.object().keys({
  localizedProperties: joi.array().items(propertiesSchema),
  segmentIds: joi.array().items(joi.string()),
  id: joi.string(),
  name: joi.string(),
  sequenceNumber: joi.number(),
  isDefault: joi.valid(true, false),
  isEnabled: joi.valid(true, false),
  createdByAccountId: joi.string(),
  modifiedByAccountId: joi.string().uuid(),
  createdAt: protoTimeStamp,
  modifiedAt: protoTimeStamp,
  rowVersion: protoTimeStamp,
  segmentLogicalOperator: joi.valid('AND', 'OR')
});

export const experienceSchema = joi.object().keys({
  scenarios: joi.array().items(scenarioSchema),
  children: joi.array(),
  id: joi.string(),
  templateId: joi.string(),
  type: joi.valid(Object.values(Constants.Experience.Types)),
  versionId: protoLong,
  isEnabled: joi.valid(true, false),
  state: joi.valid(Object.values(Constants.Experience.State)),
  childCount: joi.number(),
  createdByAccountId: joi.string(),
  modifiedByAccountId: joi.string().uuid(),
  modifiedAt: protoTimeStamp,
  createdAt: protoTimeStamp,
  rowVersion: protoTimeStamp,
  versionRowVersion: protoTimeStamp,
  name: joi.string()
});

export const updatedExperienceSchema = joi.object().keys({
  updates: joi.array().items(updatedExperience)
});
