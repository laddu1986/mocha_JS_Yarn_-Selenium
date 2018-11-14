import { joi } from '../common';

export function createMembershipSchema(membershipData) {
  var schema = joi.object().keys({
    accountId: joi.valid(membershipData.identityID).required(),
    organizationId: joi.valid(membershipData.orgID).required()
  });
  return schema;
}

function memberSchema(membershipData) {
  var schema = joi.object().keys({
    isAdmin: joi
      .boolean()
      .valid(true)
      .required(),
    fullName: joi.valid(membershipData.identityFullname).required(),
    email: joi.valid(membershipData.identityEmail).required(),
    organizationName: joi.valid(membershipData.orgName).required(),
    accountId: joi.valid(membershipData.identityID).required(),
    organizationId: joi.valid(membershipData.orgID).required()
  });
  return schema;
}

export function listMembershipSchema(membershipData) {
  var schema = joi.object().keys({
    totalRows: joi.valid(1).required(),
    results: joi
      .array()
      .items(memberSchema(membershipData))
      .required()
  });
  return schema;
}

export function getMembershipByOrdIDSchema(membershipData) {
  var schema = joi.object().keys({
    totalRows: joi.valid(1).required(),
    results: joi
      .array()
      .items(memberSchema(membershipData))
      .required()
  });
  return schema;
}

export function getMembershipByAccountIDSchema(membershipData) {
  var schema = joi.object().keys({
    totalRows: joi.valid(1).required(),
    results: joi
      .array()
      .items(memberSchema(membershipData))
      .required()
  });
  return schema;
}
