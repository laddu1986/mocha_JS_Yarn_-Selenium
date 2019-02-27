import Page from './page';

class OrgDashboardPage extends Page {
  get currentOrgName() {
    return browser.element("//*[@data-qa='page:org-dashboard']//header//p");
  }
  get welcomeMsg() {
    return browser.element("//*[@data-qa='page:org-dashboard']//*[contains(text(),'Welcome')]");
  }

  // Org
  get orgNameH2() {
    return browser.element("//*[@data-qa='page:org-dashboard']//h2");
  }
  get changeOrgAnchor() {
    return browser.element("//div[@data-qa='page:org-dashboard']//a[@href]");
  }
  get orgCardAnchor() {
    return browser.element("//a[@data-qa='org:card'][1]");
  }
  get orgCardCountAnchor() {
    return browser.elements("//a[@data-qa='org:card']");
  }

  // Space
  get createYourFirstSpaceLabel() {
    return browser.element("//section[@data-qa='page:org-dashboard']//div//h1");
  }
  get createSpaceInput() {
    return browser.element("//input[@data-qa='input:space-name']");
  }
  get createSpaceButton() {
    return browser.element("//button[@data-qa='btn:create-space']");
  }
  get createNewSpaceButton() {
    return browser.element("//a[@data-qa='btn:create-space']");
  }
  get spaceCards() {
    return browser.elements("//a[@data-qa='card:space']");
  }

  // Invite
  get inviteTeammateButton() {
    return browser.element("//button[@data-qa='btn:invite']");
  }
  get inviteEmailInput() {
    return browser.element("//input[@data-qa='input:email']");
  }
  get sendInviteButton() {
    return browser.element("//form[@data-qa='form:invite']//button[@data-qa='btn:submit']");
  }
  get pendingInviteCircle() {
    return browser.element("//div[@data-qa='section:avatars']//div[@data-qa='data:pending-invites']");
  }
  get joinButton() {
    return browser.element("//button[@data-qa='btn:join']");
  }

  open(e) {
    super.open(e);
  }
}

export default new OrgDashboardPage();
