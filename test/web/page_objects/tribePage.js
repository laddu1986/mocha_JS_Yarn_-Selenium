import Page from './page';

class TribePage extends Page {
  get audienceLink() {
    return browser.element("//*[@data-qa='nav:audience']");
  }
  get createTribeButton() {
    return browser.element("//button[@data-qa='btn:create-segment']");
  }
  get createTribeLink() {
    return browser.element("//button[@data-qa='empty-tribe-card']");
  }
  get titleField() {
    return browser.element("//input[@data-qa='input:segment-title']");
  }
  get taglineField() {
    return browser.element("//input[@data-qa='input:segment-tagline']");
  }
  get tribeCards() {
    return browser.elements("//*[@data-qa='segment:card']");
  }
  get tribeCardTitle() {
    return browser.elements("//h1[@data-qa='segment:title']");
  }
  get tribeCardTagline() {
    return browser.elements("//p[@data-qa='segment:tagline']");
  }
  get colourTab() {
    return browser.element("//button[@data-qa='tab:color']");
  }
  get logoTab() {
    return browser.element("//button[@data-qa='tab:logo']");
  }
  get wallpaperTab() {
    return browser.element("//button[@data-qa='tab:wallpaper']");
  }
  get colourSwatch() {
    return browser.elements("//button[@data-qa='btn:color']//div[@data-qa='color:display']");
  }
  get customizeButton() {
    return browser.element("//span[contains(text(),'Customize')]");
  }
  get browseLink() {
    return browser.element("//button[@title='Browse']");
  }
  get tribeCardWallpaper() {
    return browser.element("//*[@data-qa='segment:background']");
  }
  get tribeCardLogo() {
    return browser.element("//*[@data-qa='segment:logo']");
  }
  get logoLayout() {
    return browser.elements("//label[@data-qa='input:radio']");
  }
  get wallpaperPreview() {
    return browser.element("//div[@data-qa='image:preview:contained']");
  }
  get logoPreview() {
    return browser.element("//img[@data-qa='image:preview']");
  }
  get removeImage() {
    return browser.element("//button[@data-qa='btn:remove']");
  }
  get audienceType() {
    return browser.element("//button[@data-qa='segment:rule:audienceType']");
  }
  get logicalType() {
    return browser.element("//button[@data-qa='segment:rule:logicalType']");
  }
  get addFilter() {
    return browser.element("//button[@data-qa='segment:rule:addFilter']");
  }
  get audienceTypeMenuItems() {
    return browser.elements("//div[@data-qa='segment:rule:audienceType:menu-item']");
  }
  get logicalTypeMenuItems() {
    return browser.elements("//div[@data-qa='segment:rule:logicalType:menu-item']");
  }
  get properties() {
    return browser.elements("//div[@data-qa='segment:rule:addFilter:menu-item']");
  }
  get operators() {
    return browser.elements("//div[@data-qa='segment:rule:menu-item']//label");
  }
  get tribeActionsMenu() {
    return browser.element("//button[@data-qa='segment:actions']");
  }
  get deleteFilter() {
    return browser.element("//span[@data-qa='segment:rule:delete']");
  }
  get delete() {
    return browser.element("//button[@data-qa='menu-item:delete']");
  }
  get filters() {
    return browser.elements("//button[@data-qa='segment:rule:filter']");
  }
  get textField() {
    return browser.element("//input[@data-qa='segment:rule:input']");
  }
  get todayDate() {
    return browser.element("//div[contains(@class,'today')]");
  }
  get insertCategoryButton() {
    // TODO: Replace with data-qa
    return $("//button[contains(.,'Insert category')]");
  }
  get categoryTitle() {
    return browser.elements("//input[@data-qa='input:category-title']");
  }
  get categoryMoreRename() {
    return $("//button[@data-qa='menu-item:rename']");
  }
  get categoryMoreDelete() {
    return $("//button[@data-qa='menu-item:Delete']");
  }
  open(e) {
    super.open(e);
  }
}

export default new TribePage();
