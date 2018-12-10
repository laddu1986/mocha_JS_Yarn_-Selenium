import experiencesPage from 'page_objects/experienceTemplatePage';
export function goToTemplateTab() {
  experiencesPage.templateTab.click();
}

export function verifyCreateTemplatePage() {
  return experiencesPage.createTemplateCTA.isVisible();
}

export function clickCreateTemplate(type) {
  var element;
  if (type == 'button') element = experiencesPage.createTemplateCTA;
  if (type == 'link') element = experiencesPage.createTemplateLink;
  element.click();
}

export function verifyCreateTemplateModal() {
  return experiencesPage.templateName.isVisible() && experiencesPage.templateKey.isVisible();
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
  return (
    experiencesPage.editTemplateName.getAttribute('value') === name &&
    experiencesPage.templatekey.getText().includes(name.toLowerCase())
  );
}

export function verifyTemplateCard(name) {
  return experiencesPage.templateCard.getText() === name;
}

export function editTemplate(name) {
  experiencesPage.editTemplateName.clearElement();
  experiencesPage.editTemplateName.setValue(name);
}

export function saveTemplate() {
  experiencesPage.saveButton.click();
}
