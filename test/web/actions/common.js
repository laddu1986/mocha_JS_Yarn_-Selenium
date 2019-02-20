import { post, randomString } from '../common';
import NavBar from 'page_objects/navBar';
import CommonPage from 'page_objects/common';
import SignInPage from 'page_objects/signInPage';
import { confirmDeleteTxt } from 'data/messages.json';

export function getNotificationMessageText() {
  CommonPage.successMsg.waitForVisible();
  return CommonPage.successMsg.getText();
}

export function clickMoreButton() {
  CommonPage.moreButton.click();
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
  SignInPage.emailInput.setValue(email);
  SignInPage.passwordInput.setValue(password);
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
  let email = `${randomString.generate(12)}@test.co`;
  const any = {
    /*eslint-disable */
    api: identities,
    /*eslint-enable */
    data: {
      fullname: randomString.generate(12),
      email: email,
      password: process.env.ACCOUNT_PASS
    }
  };
  return post(any).then(response => {
    responseObject.identityID = response.body.id;
    responseObject.identityEmail = email;
    return response;
  });
}

export function postOrganization(responseObject) {
  const any = {
    /*eslint-disable */
    api: organizations,
    /*eslint-enable */
    data: {
      name: randomString(10),
      createdByAccountId: responseObject.identityID
    }
  };
  return post(any).then(response => {
    responseObject.orgID = response.body.id;
    return response;
  });
}

export function postMembership(responseObject) {
  const any = {
    /*eslint-disable */
    api: memberships,
    /*eslint-enable */
    data: {
      accountId: responseObject.identityID,
      organizationId: responseObject.orgID
    }
  };
  return post(any);
}

export function postSpaceByOrganizationId(responseObject) {
  const any = {
    /*eslint-disable */
    api: `${spaces + responseObject.orgID}/spaces`,
    /*eslint-enable */
    data: {
      name: randomString(10),
      createdByAccountId: responseObject.identityID,
      shortUrl: randomString(6)
    }
  };
  return post(any).then(response => {
    responseObject.spaceID = response.body.id;
    responseObject.spaceRowVersion = response.body.rowVersion;
    return response;
  });
}
