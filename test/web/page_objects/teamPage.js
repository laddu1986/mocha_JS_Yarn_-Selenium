class TeamPage{

    get inactiveTab() { return browser.element("//*[contains(text(),'Inactive')]"); }
    get email() { return browser.element("//*[@data-qa='page:org-members']"); }
   
    open(e) {
        super.open(e);
      }
    }

export default new TeamPage();
