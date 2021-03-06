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
var name = `${lib.randomString({ length: 7, charset: 'alphabetic' })}`,
  categoryTitle;
describe('Tribe Categories Actions', () => {
  before(() => {
    accountPage.open();
    createAccount();
    createSpace();
    clickOnAudienceLink();
    createTribe(name);
    clickOnAudienceLink();
  });
  it('C1295757 Verify catagory is created with tribe', () => {
    verifyCategoryOptions();
  });
  it('C1295758 Rename a category', () => {
    categoryTitle = lib.randomString(5);
    renameCategory(categoryTitle);
    expect(verifyRenamedTitle(categoryTitle, 0)).to.equal(true, 'Category was not renamed correctly');
  });
  it('C1295759 Delete an existing category with a tribe', () => {
    browser.refresh();
    deleteCategory();
    expect(verifyCategoryIsDeleted()).to.equal(categoryTitle, 'Last category was not deleted correctly');
  });
  it('C1640177 Inserting new category', () => {
    let title = `${lib.randomString({ length: 7, charset: 'alphabetic' })}`;
    createCategory();
    browser.pause(1000);
    setCategoryName(title);
    expect(verifyRenamedTitle(title, 1)).to.equal(true, 'Category was not renamed correctly');
  });
});
