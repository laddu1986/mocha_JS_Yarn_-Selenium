import '../../common';
import TribePage from 'web/page_objects/tribePage';
import tribePage from 'web/page_objects/tribePage';

export function renameCategory(newTitle) {
  TribePage.categoryMoreButton.click();
  TribePage.categoryMoreRename.click();
  TribePage.categoryTitle.setValue(newTitle);
  return browser.keys('\uE007');
}

export function deleteCategory() {
  do {
    TribePage.categoryMoreButton.click();
  } while (!tribePage.categoryMoreDelete.isVisible());
  return TribePage.categoryMoreDelete.click();
}
