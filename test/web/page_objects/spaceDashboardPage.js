class SpaceDashboardPage {
    get goToAppSettings() { return browser.element("//*[@data-qa='btn:app-settings']"); }
}
export default new SpaceDashboardPage();