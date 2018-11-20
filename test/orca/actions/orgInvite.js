import { randomString, post, orca } from '../common';

export function createOrgInvite(responseData) {
  var invitedEmail = `${randomString.generate(8)}@email.com`;
  const data = {
    query:
      'mutation CreateOrgInvite($input: CreateOrgInviteInput!) { createOrgInvite(input: $input) {total invites {token expiryDate createdTime email status}}}',
    operationName: CreateOrgInvite, // eslint-disable-line
    variables: {
      input: {
        emails: [invitedEmail],
        organizationId: responseData.orgID
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };

  return post(any, responseData).then(response => {
    responseData.orgInviteToken = response.response.body.data.createOrgInvite.invites[0].token;
    responseData.inviteEmail = invitedEmail;
    return response;
  });
}

export function getInviteTokenDetail(responseData) {
  const data = {
    query:
      'query getInviteTokenDetail($token: ID!) { orgInviteTokenInfo(token: $token) {email organizationName hasAccount status organizationId}}',
    operationName: getInviteTokenDetail, // eslint-disable-line
    variables: {
      token: responseData.orgInviteToken
    }
  };
  const any = {
    api: orca,
    data: data,
    headers: { 'Content-Type': 'application/json' }
  };

  return post(any).then(response => {
    return response;
  });
}

export function acceptOrgInvite(responseData) {
  const data = {
    query:
      'mutation acceptOrgInvite($input: AcceptOrgInviteInput!) { acceptOrgInvite(input: $input) {organization{id name slug createdByAccountId rowVersion createdTime modifiedTime spaces{id name slug} members{total members{name email accountId organizationId organizationName role{name permissionLevel} currentUser }} invites{total invites{token email expiryDate}}rowStatus }}}',
    operationName: acceptOrgInvite, // eslint-disable-line
    variables: {
      input: {
        token: responseData.orgInviteToken
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    return response;
  });
}

export function deleteOrgInvite(responseData) {
  const data = {
    query: 'mutation DeleteOrgInvite($input: DeleteOrgInviteInput!) { deleteOrgInvite(input: $input)} ',
    operationName: DeleteOrgInvite, // eslint-disable-line
    variables: {
      input: {
        email: responseData.inviteEmail,
        organizationId: responseData.orgID
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    return response;
  });
}
