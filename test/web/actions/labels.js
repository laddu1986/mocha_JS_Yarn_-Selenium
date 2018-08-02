import * as lib from '../../common';
import usersPage from '../page_objects/usersPage';

export function addLabel() {
  usersPage.addLabelButton.click()
  usersPage.labelInput.setValue(lib.randomString.generate(8))
}