import * as lib from '../../common';
import accountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { createSpace } from 'actions/space';
import { clickOnAudienceLink } from 'actions/navBar';
import {
  createCategory,
  renameCategory,
  deleteCategory,
  waitForCategoryOptions,
  verifyRenamedTitle,
  verifyLastCategoryDeleted
} from 'actions/tribeCategories';
import { clickCreateTribeButton } from 'actions/tribe';

describe('Tribe Categories Actions', () => {
  before(() => {
    accountPage.open();
    createAccount();
    createSpace();
    clickOnAudienceLink();
  });
  it('C1295757 Create a new category', () => {
    createCategory();
    waitForCategoryOptions();
  });

  it('C1295758 Rename a category', () => {
    let categoryTitle = lib.randomString.generate(5);
    renameCategory(categoryTitle);
    expect(verifyRenamedTitle(categoryTitle)).to.equal(true, 'Category was not renamed correctly');
  });
  it('C1295759 Delete an existing category with a tribe', () => {
    clickCreateTribeButton();
    clickOnAudienceLink(); // Moving away from keyboard focus
    clickOnAudienceLink(); // Actually click the audience link
    deleteCategory();
    expect(verifyLastCategoryDeleted()).to.equal(true, 'Last category was not deleted correctly');
  });
});
