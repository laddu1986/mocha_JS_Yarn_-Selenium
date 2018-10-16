class UsersPage {
  //Users landing page
  get usersTab() {
    return browser.element("//a[@data-qa='tab:users']");
  }
  get userRows() {
    return browser.elements("//tr[@data-qa='table:row-user']");
  }
  get visitorRows() {
    return browser.elements("//tr[@data-qa='table:row-visitor']");
  }
  get userNameRow() {
    return browser.elements("//span[@data-qa='row:name']");
  }
  get userUIDRow() {
    return browser.elements("//span[@data-qa='row:id']");
  }
  get userEmailRow() {
    return browser.elements("//td[@data-qa='row:email']");
  }

  get searchTextField() {
    return browser.element("//input[@id='user-search']");
  }
  get resultFoundText() {
    return browser.element("//section[@data-qa='page:space:audience']//div[2]//div//p");
  }
  get resultsText() {
    return browser.element("//section[@data-qa='page:space:audience']//div[2]//div//h3");
  }
  get userRowLabelCount() {
    return browser.element("//a[@data-qa='tag:user-row:count']");
  }

  //User Side Panel
  get userNameSidePanel() {
    return browser.element("//h3[@data-qa='header:name']");
  }
  get userIDSidePanel() {
    return browser.element("//div[@data-qa='row:id']//div");
  }
  get userEmailSidePanel() {
    return browser.element("//div[@data-qa='row:email']//div");
  }
  get closeSidePanel() {
    return browser.element("//button[@title='Close']");
  }
  get moreButton() {
    return browser.element("//button[@title='More']");
  }

  get revealLabelsButton() {
    return browser.element("//button[@data-qa='btn:reveal-labels']");
  }
  get addLabelButton() {
    return browser.element("//div[@data-qa='panel:details']//button[@data-qa='btn:add-label']");
  }
  get labelInput() {
    return browser.element("//input[@data-qa='input:add-label']");
  }
  get labels() {
    return browser.elements("//div[@data-qa='panel:details']//div[@data-qa='tag:user-metrics']");
  }
  get deleteLabelButton() {
    return browser.elements("//div[@data-qa='panel:details']//button[@data-qa='tag:user-metricsbtn:delete']");
  }
  get addedLabelsDiv() {
    return browser.element("//div[@data-qa='panel:details']//div[2]");
  }
  get labelErrMsg() {
    return browser.element("//div[@data-qa='panel:details']/div[1]/div/span");
  }
  get labelDropdown() {
    return browser.elements("//div[@data-qa='panel:details']//div[contains(@id,'downshift')]");
  }
  get userActions() {
    return browser.element("//section[@data-qa='page:space:audience']//div[2]//button[1]");
  }
  get deleteUserButton() {
    return browser.element("//button[@data-qa='menu-item:delete']");
  }

  open(e) {
    super.open(e);
  }
}

export default new UsersPage();
