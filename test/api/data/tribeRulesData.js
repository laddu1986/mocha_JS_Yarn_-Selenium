import {
  joi
} from '../../common';

const UserCount = joi.number().integer();

const UUID = joi.string().uuid();

const FilterIdVal = joi.string().regex(/filter_id_val/);

const Configuration = joi.object().keys({
  configuration: joi.object().keys({
    properties: joi.array().items(
      joi.object().keys({
        id: UUID.required(),
        label: joi.string().required(),
        type: joi.number().max(5).required(),
        allowedOperatorIds: joi.array().items(UUID).required(),
        groupLabel: joi.string().required()
      })
    ),
    operators: joi.array().items(
      joi.object().keys({
        id: UUID.required(),
        label: joi.string().required(),
        operandType: joi.number().max(5),
        groupLabel: joi.string()
      })
    )
  })
});

const Rule = joi.object().keys({
  rule: joi.object().keys({
    audienceType: joi.number().max(1).required(),
    logicalType: joi.number().max(1),
    filters: joi.array().items(
      joi.object().keys({
        filterId: FilterIdVal,
        value: joi.string().regex(/int_value/),
        filterIdVal: UUID.required(),
        filterIdIsNull: joi.bool(),
        propertyId: UUID.required(),
        operatorId: UUID.required(),
        intValue: joi.number().integer(),
        stValue: joi.string()
      }).required()
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
  ruleEstimates: joi.array().items(
      joi.object().keys({
        value: joi.string().regex(/estimation_value/),
        estimationValue:  EvaluateRule,
        isNull: joi.bool()
      })
    ).required()
});

const SampleUsers = joi.object().keys({
  userIds: joi.array().items(UUID)
});

export {
  EvaluateRule,
  EvaluateRules,
  Configuration,
  Rule,
  EvaluateFilters,
  SampleUsers
}