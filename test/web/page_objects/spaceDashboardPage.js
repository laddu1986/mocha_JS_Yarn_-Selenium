class SpaceDashboardPage {
    get goToDevPortal() { return browser.element("//button[@data-qa='btn:dev-portal']"); }
    get APIkey() { return browser.element("//*[@id='content']/div/section/section[2]/article[1]/div[1]/div/h2"); }
    get cURLcopyButton() { return browser.element("//button[@data-qa='btn:copy']"); }

    get totalUsersCount() { return browser.element("//div[@data-qa='metric:total']"); }
    get totalVisitorsCount() { return browser.element("//div[@data-qa='metric:visitors']"); }
    get totalActiveCount() { return browser.element("//article[@data-qa='metric:currentlyActive']//div//div//div"); }
    get totalNewCount() { return browser.element("//article[@data-qa='metric:newlyJoined']//div//div//div"); }
}
export default new SpaceDashboardPage();