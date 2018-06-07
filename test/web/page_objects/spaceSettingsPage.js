class SpaceSettingsPage {
    get spaceName() { return browser.element("//input[@id='spaceSettings:name']") };
    get spaceSlug() { return browser.element("//input[@id='spaceSettings:slug']") };
    get deleteSpaceButton() { return browser.element("//span[contains(text(),'Delete space')]") }
}

export default new SpaceSettingsPage();
