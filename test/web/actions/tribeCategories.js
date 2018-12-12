import '../common';
import tribePage from 'page_objects/tribePage';
import commonPage from 'page_objects/common';

export function createCategory() {
  tribePage.insertCategoryButton.click();
}

export function waitForCategoryOptions() {
  browser.waitUntil(
    () => {
      return commonPage.moreButton.isVisible() && tribePage.categoryTitle.isVisible();
    },
    3000,
    'Category took too long to create'
  );
}

export function renameCategory(newTitle) {
  commonPage.moreButton.click();
  tribePage.categoryMoreRename.click();
  tribePage.categoryTitle.setValue(newTitle);
  browser.keys('\uE007');
}

export function verifyRenamedTitle(title) {
  return tribePage.categoryTitle.getAttribute('value') === title;
}

export function deleteCategory() {
  do {
    commonPage.moreButton.click();
  } while (!tribePage.categoryMoreDelete.isVisible());
  tribePage.categoryMoreDelete.click();
}

export function verifyLastCategoryDeleted() {
  return tribePage.categoryTitle.getAttribute('value') === '' && tribePage.tribeCards.value.length === 1;
}
