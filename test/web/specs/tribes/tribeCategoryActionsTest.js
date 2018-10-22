import * as lib from '../../../common';
import accountPage from 'web/page_objects/accountPage';
import { createAccount } from 'web/actions/account';
import { createSpace } from 'web/actions/space';
import { clickOnAudienceLink } from 'web/actions/navBar';
import { renameCategory, deleteCategory } from 'web/actions/tribeCategories';
import { clickCreateTribeButton } from 'web/actions/tribe';
import tribePage from 'web/page_objects/tribePage';

describe('Tribe Categoies Actions', () => {
  before(() => {
    accountPage.open();
    createAccount();
    createSpace();
    clickOnAudienceLink();
  });
  it('Create a new category', () => {
    tribePage.insertCategoryButton.click();
    browser.waitUntil(
      () => {
        return tribePage.categoryMoreButton.isVisible() && tribePage.categoryTitle.isVisible();
      },
      3000,
      'Category took too long to create'
    );
  });
  it('Rename a category', () => {
    let categoryTitle = lib.randomString.generate(5);
    renameCategory(categoryTitle);
    expect(tribePage.categoryTitle.getAttribute('value')).to.equal(categoryTitle);
  });
  it('Delete an existing category with a tribe', () => {
    clickCreateTribeButton();
    clickOnAudienceLink(); // Moving away from keyboard focus
    clickOnAudienceLink(); // Actually click the audience link
    deleteCategory();
    expect(tribePage.categoryTitle.getAttribute('value')).to.equal('');
    expect(tribePage.tribeCards.value.length).to.equal(1);
  });
});
