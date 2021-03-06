import { post, randomString } from '../common';
import NavBar from 'page_objects/navBar';
import CommonPage from 'page_objects/common';
import SignInPage from 'page_objects/signInPage';
import { confirmDeleteTxt } from 'data/messages.json';

export function getNotificationMessageText() {
  CommonPage.successMsg.waitForVisible();
  return CommonPage.successMsg.getText();
}

export function clickMoreButton(index) {
  if (index == undefined) index = 0;
  CommonPage.moreButton.value[index].click();
}

export function verifyMoreButton() {
  return CommonPage.editOnCard.isVisible() && CommonPage.deleteOnCard.isVisible();
}

export function clickSettingsFromCard() {
  CommonPage.editOnCard.click();
}

export function clickDeleteFromCard() {
  CommonPage.deleteOnCard.click();
}
export function clickSureButton() {
  CommonPage.iAmSureButton.click();
}

export function verifyDeleteModal() {
  return CommonPage.confirmInput.isVisible();
}

export function closeModal() {
  return CommonPage.closeModal.click();
}

export function closePassiveNotification() {
  CommonPage.dismissNotification.waitForVisible();
  return CommonPage.dismissNotification.click();
}

export function signIn(email, password) {
  //TODO: Had to disable this flow due to bug in sign in page https://app.clickup.com/t/nd96p
  //SignInPage.emailInput.setValue(email);
  //SignInPage.passwordInput.setValue(password);
  SignInPage.emailInput.click();
  SignInPage.emailInput.click();
  browser.keys(email);
  SignInPage.passwordInput.click();
  SignInPage.passwordInput.click();
  browser.keys(password);
  submit();
  NavBar.profileMenu.waitForVisible();
  hideIntercom();
}

export function typeDeleteToConfirm() {
  CommonPage.confirmInput.setValue(confirmDeleteTxt);
}

export function confirmDelete() {
  CommonPage.confirmButton.click();
}

export function cancelDelete(element) {
  browser.pause(500);
  try {
    element.click();
    return false;
  } catch (error) {
    CommonPage.cancelButton.click();
    return true;
  }
}

export function confirmButtonIsEnabled() {
  return CommonPage.confirmButton.isEnabled();
}
export function get404PageText() {
  return CommonPage.invalidPage.getText();
}

export function clickLinkOn404Page() {
  CommonPage.linkOnInvalidpage.click();
}
//hide intercom icon as it gets in the way of other elements and prevents clicking them
export function hideIntercom() {
  CommonPage.intercomIcon.waitForVisible();
  browser.execute(function() {
    const intercom = document.getElementById('intercom-container');
    if (intercom.style.display === 'none') {
      intercom.style.display = 'block';
    } else {
      intercom.style.display = 'none';
    }
  });
}

export function submit() {
  CommonPage.submitButton.click();
}

export function postIdentity(responseObject) {
  let email = `${randomString(12)}@test.co`;
  const any = {
    api: identities, //eslint-disable-line
    data: {
      fullname: randomString(12),
      email: email,
      password: process.env.ACCOUNT_PASS
    }
  };
  return post(any).then(response => {
    if (response.response.statusCode == 201) {
      responseObject.identityID = response.body.id;
      responseObject.identityEmail = any.data.email;
      responseObject.identityFullname = any.data.fullname;
    } else
      throw `Post request for Identity API failed with code ${
        response.response.statusCode
      } and the error ${JSON.stringify(response.response.body)}`;
  });
}

export function postOrganization(responseObject) {
  const any = {
    api: organizations, //eslint-disable-line
    data: {
      name: randomString(10),
      createdByAccountId: responseObject.identityID
    }
  };
  return post(any).then(response => {
    if (response.response.statusCode == 201) {
      responseObject.orgID = response.body.id;
      responseObject.organization = any.data.name;
    } else
      throw `postOrganization failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}

export function postMembership(responseObject) {
  const any = {
    api: memberships, //eslint-disable-line
    data: {
      accountId: responseObject.identityID,
      organizationId: responseObject.orgID
    }
  };
  return post(any).then(response => {
    if (response.response.statusCode != 201)
      throw `postMembership failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}

export function postSpaceByOrganizationId(responseObject) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces`, //eslint-disable-line
    data: {
      name: randomString(10),
      createdByAccountId: responseObject.identityID,
      shortUrl: randomString(6)
    }
  };
  return post(any).then(response => {
    if (response.response.statusCode == 201) {
      responseObject.spaceID = response.body.id;
      responseObject.spaceName = any.data.name;
      responseObject.shortUrl = any.data.shortUrl;
      responseObject.spaceRowVersion = response.body.rowVersion;
    } else
      throw `postSpaceByOrganizationId failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}

export function getAccessToken(responseObject) {
  const any = {
    api: token, //eslint-disable-line
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${process.env.AUTH_CODE}`
    },
    data: '',
    body: `grant_type=password&username=${responseObject.identityEmail}&password=${
      process.env.ACCOUNT_PASS
    }&scope=backend_service&client_id=frontend_service`
  };
  return post(any).then(response => {
    if (response.response.statusCode == 200) {
      responseObject.accessToken = response.body.access_token;
    } else
      throw `getAccessToken failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}

export function postInvitesByOrganizationId(responseObject) {
  getAccessToken(responseObject);
  let emailInvited = `${randomString(5)}@test.co`;
  const any = {
    api: `${organizations + responseObject.orgID}/invites`, //eslint-disable-line
    data: [emailInvited],
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${responseObject.accessToken}`
    }
  };
  responseObject.inviteEmail = emailInvited;
  return post(any).then(response => {
    if (response.response.statusCode != 201)
      throw `postInvitesByOrganizationId failed with code ${
        response.response.statusCode
      } and the error ${JSON.stringify(response.response.body)}`;
  });
}
