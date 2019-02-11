import * as lib from '../../common';
import accountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { createSpace } from 'actions/space';
import { clickOnAudienceLink } from 'actions/navBar';
import {
  createCategory,
  renameCategory,
  deleteCategory,
  verifyCategoryOptions,
  verifyRenamedTitle,
  verifyCategoryIsDeleted,
  setCategoryName
} from 'actions/tribeCategories';
import { createTribe } from 'actions/tribe';
var name = `${lib.randomString({ length: 7, charset: 'alphabetic' })}`;
describe('Tribe Categories Actions', () => {
  before(() => {
    accountPage.open();
    createAccount();
    createSpace();
    clickOnAudienceLink();
    createTribe(name);
    clickOnAudienceLink();
  });
  it('Verify catagory is created with tribe', () => {
    verifyCategoryOptions();
  });
  it('Rename a category', () => {
    let categoryTitle = lib.randomString(5);
    renameCategory(categoryTitle);
    expect(verifyRenamedTitle(categoryTitle, 0)).to.equal(true, 'Category was not renamed correctly');
  });
  it('Delete an existing category with a tribe', () => {
    browser.refresh();
    deleteCategory();
    expect(verifyCategoryIsDeleted()).to.equal('', 'Last category was not deleted correctly');
  });
  it('Inserting new category', () => {
    let title = `${lib.randomString({ length: 7, charset: 'alphabetic' })}`;
    createCategory();
    browser.pause(1000);
    setCategoryName(title);
    expect(verifyRenamedTitle(title, 1)).to.equal(true, 'Category was not renamed correctly');
  });
});
