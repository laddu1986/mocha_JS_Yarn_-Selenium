class SpaceDashboardPage {
    get goToAppSettings() { return browser.element("//*[@data-qa='btn:app-settings']"); }
    get APIkey() { return browser.element("//*[@id='content']/div/section/section[2]/article[1]/div[1]/div/h2") }

    get totalUsersCount() { return browser.element("//div[@data-qa='metric:total']"); }
    get totalVisitorsCount() { return browser.element("//div[@data-qa='metric:visitors']"); }
    get totalActiveCount() { return browser.element("//article[@data-qa='metric:currentlyActive']//div//div//div"); }
    get totalNewCount() { return browser.element("//article[@data-qa='metric:newlyJoined']//div//div//div"); }
}
export default new SpaceDashboardPage();