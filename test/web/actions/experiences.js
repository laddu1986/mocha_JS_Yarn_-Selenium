import experiencesPage from 'page_objects/ExperienceTemplatePage';
import commonPage from 'page_objects/common';

export function goToTemplateTab() {
    experiencesPage.templateTab.click();
}

export function verifyCreateTemplatePage() {
    return (experiencesPage.createTemplateCTA.isVisible());
}

export function clickCreateTemplate(type) {
    var element;
    if (type == 'button')
        element = experiencesPage.createTemplateCTA;
    if (type == 'link')
        element = experiencesPage.createTemplateLink;
    element.click();
}

export function verifyCreateTemplateModal() {
    return (experiencesPage.templateName.isVisible() && experiencesPage.templateKey.isVisible());
}

export function createExperienceTemplate(name) {
    experiencesPage.templateName.setValue(name);
    experiencesPage.templateKey.setValue(name.toLowerCase());
    experiencesPage.createButton.click();
}

export function verifyCreateButton() {
    return experiencesPage.createButton.isEnabled();
}

export function verifyTemplateIsCreated(name) {
    return (experiencesPage.editTemplateName.getAttribute("value") === name && experiencesPage.templatekey.getText().includes(name.toLowerCase()))
}

export function verifyTemplateCard(name) {
    if (experiencesPage.templateCard.value.length > 0)
        return (experiencesPage.templateCard.value[0].getText() === name);
    else
        return false;
}

export function clickEditButton() {
    commonPage.moreButton.click();
    experiencesPage.editTemplate.click();
}

export function clickDeleteButton() {
    commonPage.moreButton.click();
    experiencesPage.deleteTemplate.click();
}

export function editTemplate(name) {
    experiencesPage.editTemplateName.clearElement();
    experiencesPage.editTemplateName.setValue(name);
}

export function saveTemplate() {
    experiencesPage.saveButton.click();
}