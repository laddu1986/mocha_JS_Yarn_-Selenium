import { randomString } from '../common';
import { updateExperienceTemplate } from 'actions/templates';

//client.updateExperienceTemplate({context:{org_id:"d9ce4920-c050-40fe-99dc-648a9cd0eb53", space_id:"29bbee2d-dc19-48cb-9091-50168909c408"}, experience_template: {id:36253, key:"key2", name:"name1","row_version":{"seconds":"1544412788","nanos": 443398400}, "properties":[{"name":"prop1_rename", "key":"prop1key","type_key":"integer"}]}}, pr)

export function createProperty(templateData, propertyType) {
  let nameKey = randomString.generate({ length: 40, charset: 'alphabetic', capitalization: 'lowercase' });
  let propertiesArray = templateData.template.properties === undefined ? [] : templateData.template.properties;
  propertiesArray.push({
    name: nameKey,
    key: nameKey,
    typeKey: propertyType
  });
  let templatePayload = {
    id: templateData.template.id,
    name: templateData.template.name,
    key: templateData.template.key,
    properties: propertiesArray,
    rowVersion: templateData.template.rowVersion
  };
  return updateExperienceTemplate(templateData, templatePayload)
    .exec()
    .then(response => {
      templateData.template = response.response;
      return response;
    });
}

export function renameFirstProperty(templateData) {
  let newName = randomString.generate({ length: 40, charset: 'alphabetic', capitalization: 'lowercase' });
  templateData.template.properties[0].name = newName;
  let templatePayload = {
    id: templateData.template.id,
    name: templateData.template.name,
    key: templateData.template.key,
    properties: [
      {
        name: newName,
        key: templateData.template.properties[0].key,
        typeKey: templateData.template.properties[0].typeKey
      }
    ],
    rowVersion: templateData.template.rowVersion
  };
  return updateExperienceTemplate(templateData, templatePayload).exec();
}

export function deleteProperty(templateData) {
  let templatePayload = {
    id: templateData.template.id,
    name: templateData.template.name,
    key: templateData.template.key,
    properties: [],
    rowVersion: templateData.template.rowVersion
  };
  return updateExperienceTemplate(templateData, templatePayload).exec();
}
