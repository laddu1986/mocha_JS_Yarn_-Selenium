import { joi } from '../common';

export function createMembershipSchema(membershipData) {
  var schema = joi.object().keys({
    accountId: joi.valid(membershipData.identityID).required(),
    organizationId: joi.valid(membershipData.orgID).required()
  });
  return schema;
}

function memberSchema(membershipData) {
  return joi.object().keys({
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
}

export function listMembershipSchema(membershipData) {
  return joi.object().keys({
    totalRows: joi.valid(1).required(),
    results: joi
      .array()
      .items(memberSchema(membershipData))
      .required()
  });
}

export function getMembershipByOrdIDSchema(membershipData) {
  return joi.object().keys({
    totalRows: joi.valid(1).required(),
    results: joi
      .array()
      .items(memberSchema(membershipData))
      .required()
  });
}

export function getMembershipByAccountIDSchema(membershipData) {
  return joi.object().keys({
    totalRows: joi.valid(1).required(),
    results: joi
      .array()
      .items(memberSchema(membershipData))
      .required()
  });
}
