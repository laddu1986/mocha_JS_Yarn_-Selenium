class SpaceSettingsPage {
    get spaceName() { return browser.element("//input[@id='spaceSettings:name']") };
    get spaceSlug() { return browser.element("//input[@id='spaceSettings:slug']") };
    get deleteSpaceButton() { return browser.element("//button[@data-qa='btn:delete']") }
}

export default new SpaceSettingsPage();
