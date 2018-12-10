import '../common';
import { updateExperienceTemplate } from 'actions/templates';

export function createTextProperty(templateData) {
  let templatePayload = {
    id: templateData.template.id,
    key: templateData.template.key,
    name: 'newName',
    rowVersion: templateData.template.rowVersion,
    properties: [
      {
        name: 'testName',
        key: 'test',
        typeKey: 'text'
      }
    ]
  };
  return updateExperienceTemplate(templateData, templatePayload).exec();
}
