import { joi, membershipData } from '../../common';

export const createMembershipSchema = joi.object().keys({
  accountId: joi.valid(membershipData.identityID).required(),
  organizationId: joi.valid(membershipData.orgID).required()
});
const objectSchema1 = joi.object().keys({
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
export const listMembershipSchema = joi.object().keys({
  totalRows: joi.valid(1).required(),
  results: joi
    .array()
    .items(objectSchema1)
    .required()
});
const objectSchema2 = joi.object().keys({
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
export const getMembershipByOrdIDSchema = joi.object().keys({
  totalRows: joi.valid(1).required(),
  results: joi
    .array()
    .items(objectSchema2)
    .required()
});
const objectSchema3 = joi.object().keys({
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
export const getMembershipByAccountIDSchema = joi.object().keys({
  totalRows: joi.valid(1).required(),
  results: joi
    .array()
    .items(objectSchema3)
    .required()
});
