import { joi } from '../common';
import * as constants from 'constants.json';

const UUID = joi.string().uuid();

const configurationProperties = joi.array().items(
  joi.object().keys({
    id: UUID.required(),
    label: joi.valid(Object.values(constants.TribeRulesFilters.Properties)).required(),
    type: joi.valid(Object.values(constants.TribeRulesFilters.OperandTypes)).required(),
    allowedOperatorIds: joi
      .array()
      .items(UUID)
      .required(),
    groupLabel: joi.valid(constants.TribeRulesFilters.PropertyGroupLabels).required(),
    key: joi.valid(Object.keys(constants.TribeRulesFilters.Properties)).required()
  })
);

const configurationOperators = joi.array().items(
  joi.object().keys({
    id: UUID.required(),
    label: joi.valid(Object.values(constants.TribeRulesFilters.Operators)).required(),
    operandType: joi.valid(Object.values(constants.TribeRulesFilters.OperandTypes)),
    groupLabel: joi.valid(constants.TribeRulesFilters.OperandGroupLabels),
    key: joi.valid(Object.keys(constants.TribeRulesFilters.Operators)).required()
  })
);

function filterRule(rulesData) {
  return joi.object().keys({
    audienceType: joi.valid(Object.values(constants.TribeRulesFilters.AudienceType)),
    logicalType: joi.valid(Object.values(constants.TribeRulesFilters.LogicalType)),
    filters: joi
      .array()
      .items(
        joi.object().keys({
          filterIdVal: UUID,
          propertyId: joi.valid(rulesData.ActiveDaysProperty),
          operatorId: joi.valid(rulesData.AnyValueOperator)
        })
      )
      .required()
  });
}

export const getConfiguration = joi.object().keys({
  configuration: joi.object().keys({
    properties: configurationProperties,
    operators: configurationOperators
  })
});

export function saveRule(rulesData) {
  return joi.object().keys({
    success: joi.valid(true),
    rule: filterRule(rulesData)
  });
}

export function getRule(rulesData) {
  return joi.object().keys({
    rule: filterRule(rulesData)
  });
}

export const evaluateRuleFilters = joi.object().keys({
  filterEstimates: joi.array().items(
    joi.object().keys({
      filterId: joi.string().regex(/filter_id_val/),
      filterIdVal: UUID.required(),
      filterIdIsNull: joi.bool(),
      userCount: joi.number().integer()
    })
  )
});

export const evaluateRule = joi.object().keys({
  userCount: joi.number().integer(),
  prevUserCount: joi.number().integer(),
  activeUserCount: joi.number().integer(),
  prevActiveUserCount: joi.number().integer(),
  totalUsers: joi.number().integer()
});

export const evaluateRules = joi.object().keys({
  ruleEstimates: joi
    .array()
    .items(
      joi.object().keys({
        value: joi.string().regex(/estimation_value/),
        estimationValue: evaluateRule,
        isNull: joi.bool()
      })
    )
    .required()
});

export const sampleUsers = joi.object().keys({ userIds: joi.array().items(UUID) });
