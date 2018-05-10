import * as lib from '../../common';
import SignInPage from '../page_objects/signInPage';
import CommonPage from '../page_objects/common';

function waitForElement(wfe) {
  wfe.waitForExist();
  wfe.waitForVisible();
}

function setValue(sv, data) {
  waitForElement(sv);
  sv.setValue(data);
}

function click(c) {
  waitForElement(c);
  c.click();
}

function waitForEnabled(ena) {
  waitForElement(ena);
  ena.waitForEnabled();
}

function getNotificationMessageText() {
  waitForElement(CommonPage.successMsg);
  return CommonPage.successMsg.getText();
}

export {
  setValue,
  click,
  waitForEnabled,
  waitForElement,
  getNotificationMessageText
};
