import * as lib from '../../common';

export const createMembershipSchema = lib.joi.object().keys({
  accountId: lib.joi.valid(lib.membershipData.identityID).required(),
  organizationId: lib.joi.valid(lib.membershipData.orgID).required()
});
const objectSchema1 = lib.joi.object().keys({
  isAdmin: lib.joi
    .boolean()
    .valid(true)
    .required(),
  fullName: lib.joi.valid(lib.membershipData.identityFullname).required(),
  email: lib.joi.valid(lib.membershipData.identityEmail).required(),
  organizationName: lib.joi.valid(lib.membershipData.orgName).required(),
  accountId: lib.joi.valid(lib.membershipData.identityID).required(),
  organizationId: lib.joi.valid(lib.membershipData.orgID).required()
});
export const listMembershipSchema = lib.joi.object().keys({
  totalRows: lib.joi.valid(1).required(),
  results: lib.joi
    .array()
    .items(objectSchema1)
    .required()
});
const objectSchema2 = lib.joi.object().keys({
  isAdmin: lib.joi
    .boolean()
    .valid(true)
    .required(),
  fullName: lib.joi.valid(lib.membershipData.identityFullname).required(),
  email: lib.joi.valid(lib.membershipData.identityEmail).required(),
  organizationName: lib.joi.valid(lib.membershipData.orgName).required(),
  accountId: lib.joi.valid(lib.membershipData.identityID).required(),
  organizationId: lib.joi.valid(lib.membershipData.orgID).required()
});
export const getMembershipByOrdIDSchema = lib.joi.object().keys({
  totalRows: lib.joi.valid(1).required(),
  results: lib.joi
    .array()
    .items(objectSchema2)
    .required()
});
const objectSchema3 = lib.joi.object().keys({
  isAdmin: lib.joi
    .boolean()
    .valid(true)
    .required(),
  fullName: lib.joi.valid(lib.membershipData.identityFullname).required(),
  email: lib.joi.valid(lib.membershipData.identityEmail).required(),
  organizationName: lib.joi.valid(lib.membershipData.orgName).required(),
  accountId: lib.joi.valid(lib.membershipData.identityID).required(),
  organizationId: lib.joi.valid(lib.membershipData.orgID).required()
});
export const getMembershipByAccountIDSchema = lib.joi.object().keys({
  totalRows: lib.joi.valid(1).required(),
  results: lib.joi
    .array()
    .items(objectSchema3)
    .required()
});
