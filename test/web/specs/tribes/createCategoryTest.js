import * as lib from '../../../common';
import accountPage from 'web/page_objects/accountPage';
import { createAccount } from 'web/actions/account';
import { createSpace } from 'web/actions/space';
import { clickOnAudienceLink } from 'web/actions/navBar';
import { renameCategory, deleteCategory } from 'web/actions/tribeCategories';
import tribePage from 'web/page_objects/tribePage';

describe('Create Tribe Categories', () => {
  before(() => {
    accountPage.open();
    createAccount();
    createSpace();
    clickOnAudienceLink();
  });
  it('Verify untitled category is created', () => {
    tribePage.insertCategoryButton.click();
    browser.waitUntil(
      () => {
        return tribePage.categoryMoreButton.isVisible() && tribePage.categoryTitle.isVisible();
      },
      3000,
      'Category took too long to create'
    );
  });
  it('Can rename the category', () => {
    const categoryTitle = lib.randomString.generate(5);
    renameCategory(categoryTitle);
    expect(tribePage.categoryTitle.getAttribute('value')).to.equal(categoryTitle);
  });
  it('Can delete an existing category', () => {
    deleteCategory();
    expect(tribePage.categoryTitle.isVisible()).to.be.false;
    expect(tribePage.categoryMoreButton.isVisible()).to.be.false;
  });
});
