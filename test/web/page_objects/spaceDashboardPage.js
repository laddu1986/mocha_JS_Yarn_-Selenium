class SpaceDashboardPage {
    get goToAppSettings() { return browser.element("//*[@data-qa='btn:app-settings']"); }
    get APIkey() { return browser.element("//*[@id='content']/div/section/section[2]/article[1]/div[1]/div/h2") }

}
export default new SpaceDashboardPage();