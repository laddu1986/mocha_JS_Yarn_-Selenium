import '../common';
import tribePage from 'page_objects/tribePage';
import commonPage from 'page_objects/common';

export function createCategory() {
  tribePage.insertCategoryButton.click();
}

export function verifyCategoryOptions() {
  browser.waitUntil(
    () => {
      return tribePage.categoryTitle.value[0].isVisible();
    },
    3000,
    'Category took too long to create'
  );
}

export function renameCategory(newTitle) {
  commonPage.moreButton.value[0].click();
  tribePage.categoryMoreRename.click();
  tribePage.categoryTitle.value[0].setValue(newTitle);
  browser.keys('\uE007');
}

export function setCategoryName(name) {
  tribePage.categoryTitle.value[1].waitForVisible();
  tribePage.categoryTitle.value[1].setValue(name);
  browser.keys('\uE007');
}

export function verifyRenamedTitle(title, index) {
  return tribePage.categoryTitle.value[index].getAttribute('value') === title;
}

export function deleteCategory() {
  do {
    commonPage.moreButton.value[0].click();
  } while (!tribePage.categoryMoreDelete.isVisible());
  tribePage.categoryMoreDelete.click();
}

export function verifyCategoryIsDeleted() {
  if (tribePage.tribeCards.value.length === 1) return tribePage.categoryTitle.getAttribute('value');
}
