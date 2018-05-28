import * as lib from '../../common';
import SignInPage from 'web/page_objects/signInPage';

function waitForElement(wfe) {
  wfe.waitForExist();
  wfe.waitForVisible();
}

function setValue(sv, data) {
  waitForElement(sv);
  sv.setValue(data);
}

function click(c) {
  waitForElement(c)
  c.isEnabled();
  c.click();
}

/* function waitForEnabled(ena) {
   waitForElement(ena);
  ena.waitForEnabled();
} */

/* function ifEnabled(element) {
  return element.isEnabled();
} */


export {
  setValue,
  click,
  //waitForEnabled,
  waitForElement,
  //ifEnabled
};
