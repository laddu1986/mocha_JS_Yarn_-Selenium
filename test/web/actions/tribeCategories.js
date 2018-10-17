import '../../common';
import tribePage from 'web/page_objects/tribePage';

export function renameCategory(newTitle) {
  tribePage.categoryMoreButton.click();
  tribePage.categoryMoreRename.click();
  tribePage.categoryTitle.setValue(newTitle);
  return browser.keys('\uE007');
}

export function deleteCategory() {
  do {
    tribePage.categoryMoreButton.click();
  } while (!tribePage.categoryMoreDelete.isVisible());
  return tribePage.categoryMoreDelete.click();
}
