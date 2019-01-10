import { joi } from '../common';
import * as constants from 'constants.json';

const UserCount = joi.number().integer();

const UUID = joi.string().uuid();

const FilterIdVal = joi.string().regex(/filter_id_val/);

//const labels = Object.keys(constan)

const configurationProperties =joi.array().items(
  joi.object().keys({
    id: UUID.required(),
    label: joi.valid(Object.values(constants.TribeRulesFilters.Properties)).required(),
    type: joi.valid(Object.values(constants.TribeRulesFilters.OperandTypes)).required(),
    allowedOperatorIds: joi.array().items(UUID).required(),
    groupLabel: joi.valid(constants.TribeRulesFilters.PropertyGroupLabels).required(),
    key: joi.valid(Object.keys(constants.TribeRulesFilters.Properties)).required()
  })
)

const configurationOperators = joi.array().items(
  joi.object().keys({
    id: UUID.required(),
    label: joi.valid(Object.values(constants.TribeRulesFilters.Operators)).required(),
    operandType: joi.valid(Object.values(constants.TribeRulesFilters.OperandTypes)),
    groupLabel: joi.valid(constants.TribeRulesFilters.OperandGroupLabels),
    key: joi.valid(Object.keys(constants.TribeRulesFilters.Operators)).required()
  })
)

const Configuration = joi.object().keys({
  configuration: joi.object().keys({
    properties: configurationProperties,
    operators: configurationOperators
  })
});

const Rule = joi.object().keys({
  rule: joi.object().keys({
    audienceType: joi
      .number()
      .max(1)
      .required(),
    logicalType: joi.number().max(1),
    filters: joi.array().items(
      joi
        .object()
        .keys({
          filterId: FilterIdVal,
          value: joi.string().regex(/int_value/),
          filterIdVal: UUID.required(),
          filterIdIsNull: joi.bool(),
          propertyId: UUID.required(),
          operatorId: UUID.required(),
          intValue: joi.number().integer(),
          stValue: joi.string()
        })
        .required()
    )
  })
});

const EvaluateFilters = joi.object().keys({
  filterEstimates: joi.array().items(
    joi.object().keys({
      filterId: FilterIdVal,
      filterIdVal: UUID.required(),
      filterIdIsNull: joi.bool(),
      userCount: joi.number().integer()
    })
  )
});

const EvaluateRule = joi.object().keys({
  userCount: UserCount,
  prevUserCount: UserCount,
  activeUserCount: UserCount,
  prevActiveUserCount: UserCount,
  totalUsers: UserCount
});

const EvaluateRules = joi.object().keys({
  ruleEstimates: joi
    .array()
    .items(
      joi.object().keys({
        value: joi.string().regex(/estimation_value/),
        estimationValue: EvaluateRule,
        isNull: joi.bool()
      })
    )
    .required()
});

const SampleUsers = joi.object().keys({ userIds: joi.array().items(UUID) });

export { EvaluateRule, EvaluateRules, Configuration, Rule, EvaluateFilters, SampleUsers };
