import '../../common';
import tribePage from 'web/page_objects/tribePage';

export function createCategory() {
  tribePage.insertCategoryButton.click();
}

export function waitForCategoryOptions() {
  browser.waitUntil(
    () => {
      return tribePage.categoryMoreButton.isVisible() && tribePage.categoryTitle.isVisible();
    },
    3000,
    'Category took too long to create'
  );
}

export function renameCategory(newTitle) {
  tribePage.categoryMoreButton.click();
  tribePage.categoryMoreRename.click();
  tribePage.categoryTitle.setValue(newTitle);
  return browser.keys('\uE007');
}

export function verifyRenamedTitle(title) {
  return tribePage.categoryTitle.getAttribute('value') === title;
}

export function deleteCategory() {
  do {
    tribePage.categoryMoreButton.click();
  } while (!tribePage.categoryMoreDelete.isVisible());
  return tribePage.categoryMoreDelete.click();
}

export function verifyLastCategoryDeleted() {
  return tribePage.categoryTitle.getAttribute('value') === '' && tribePage.tribeCards.value.length === 1;
}
