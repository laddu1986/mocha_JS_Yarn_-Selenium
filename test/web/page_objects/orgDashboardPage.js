import Page from './page';


class OrgDashboardPage extends Page {
  get currentOrgName() { return browser.element("//*[@data-qa='page:org-dashboard']//header//p") }
  get welcomeMsg() { return browser.element("//*[@data-qa='page:org-dashboard']//*[contains(text(),'Welcome')]") }
  get orgSettingsNavMenu() { return browser.element("//div[@data-qa='menu:profile']//a[@data-qa='nav:org-settings']") }

  //Org
  get orgNameH2() { return browser.element("//*[@data-qa='page:org-dashboard']//h2"); }
  get changeOrgAnchor() { return browser.element("//div[@data-qa='page:org-dashboard']//a[@href]"); }
  get orgCardAnchor() { return browser.element("//a[@data-qa='org:card'][1]"); }
  get orgCardCountAnchor() { return browser.elements("//a[@data-qa='org:card']"); }

  //Space
  get createSpaceInput() { return browser.element("//input[@data-qa='input:space-name']") }
  get createSpaceButton() { return browser.element("//button[@data-qa='button:create-space']") }
  get createNewSpaceButton() { return browser.element("//a[@data-qa='link:create-space']") }
  get spaceCards() { return browser.elements("//a[starts-with(@data-qa,'space:')]") }

  //Invite
  get inviteTeammateButton() { return browser.element("//div[contains(text(),'Invite teammate')]") }
  get inviteEmailInput() { return browser.element("//input[@data-qa='input:email']") }
  get sendInviteButton() { return browser.element("//button[@data-qa='button:invite']") }
  get pendingInviteCircle() { return browser.element("//div[@data-qa='page:org-dashboard']//div[contains(@class,'pending')]") }

  open(e) {
    super.open(e);
  }
}

export default new OrgDashboardPage();