import * as lib from '../../../common';
import accountPage from 'web/page_objects/accountPage';
import { createAccount } from 'web/actions/account';
import { createSpace } from 'web/actions/space';
import { clickOnAudienceLink } from 'web/actions/navBar';
import {
  createCategory,
  renameCategory,
  deleteCategory,
  waitForCategoryOptions,
  verifyRenamedTitle,
  verifyLastCategoryDeleted
} from 'web/actions/tribeCategories';
import { clickCreateTribeButton } from 'web/actions/tribe';

describe('Tribe Categories Actions', () => {
  before(() => {
    accountPage.open();
    createAccount();
    createSpace();
    clickOnAudienceLink();
  });
  it('Create a new category', () => {
    createCategory();
    waitForCategoryOptions();
  });

  it('Rename a category', () => {
    let categoryTitle = lib.randomString.generate(5);
    renameCategory(categoryTitle);
    expect(verifyRenamedTitle(categoryTitle)).to.equal(true, 'Category was not renamed correctly');
  });
  it('Delete an existing category with a tribe', () => {
    clickCreateTribeButton();
    clickOnAudienceLink(); // Moving away from keyboard focus
    clickOnAudienceLink(); // Actually click the audience link
    deleteCategory();
    expect(verifyLastCategoryDeleted()).to.equal(true, 'Last category was not deleted correctly');
  });
});
