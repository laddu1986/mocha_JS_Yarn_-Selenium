import { path, caller, randomString } from '../common';
import * as constants from 'constants.json';

const PROTO_PATH = path.resolve(process.env.USER_PROTO_DIR + 'spaceUserService.proto');
const client = caller(process.env.USER_HOST, PROTO_PATH, 'spaceUserService');

export function identifySpaceUser(userData) {
  userData.userInternalID = randomString.generate(16);

  const req = new client.Request('identifySpaceUser', {
    externalId: constants.UserDetails.ExternalID,
    organizationId: userData.orgID,
    spaceId: userData.spaceID,
    internalId: userData.userInternalID,
    email: userData.identityEmail,
    lastIpAddress: constants.UserDetails.IPAddress,
    audienceType: constants.UserType.User,
    lastDeviceType: constants.UserDetails.DeviceType,
    displayName: constants.UserDetails.DisplayName,
    lastLocation: constants.UserDetails.Location
  }).withResponseStatus(true);

  return req.exec();
}

export function listSpaceUsers(userData) {
  const req = new client.Request('listSpaceUsers', {
    spaceId: userData.spaceID,
    keyword: 'Auto',
    limit: 20
  }).withResponseStatus(true);

  return req.exec();
}

export function getSpaceUserStatistics(userData) {
  const req = new client.Request('getSpaceUserStatistics', {
    spaceId: userData.spaceID
  }).withResponseStatus(true);

  return req.exec();
}

export function getSpaceUserDetails(userData) {
  const req = new client.Request('getSpaceUserDetails', {
    spaceId: userData.spaceID,
    userId: userData.userInternalID
  }).withResponseStatus(true);

  return req.exec();
}

export function addSpaceUserLabels(userData, labels) {
  userData.labels = labels;
  const req = new client.Request('addSpaceUserLabels', {
    userIds: [userData.userInternalID],
    spaceId: userData.spaceID,
    labels: labels
  }).withResponseStatus(true);
  return req.exec();
}

export function removeSpaceUserLabels(userData) {
  const req = new client.Request('removeSpaceUserLabels', {
    userIds: [userData.userInternalID],
    spaceId: userData.spaceID,
    labels: userData.labels
  }).withResponseStatus(true);

  return req.exec();
}

export function searchLabels(userData) {
  const req = new client.Request('searchSpaceUserLabels', {
    spaceId: userData.spaceID,
    limit: 5,
    keyword: userData.labels
  }).withResponseStatus(true);

  return req.exec();
}

export function deleteSpaceUsers(userData) {
  const req = new client.Request('deleteSpaceUsers', {
    spaceId: userData.spaceID,
    userIds: [userData.internalId]
  }).withResponseStatus(true);

  return req.exec();
}
