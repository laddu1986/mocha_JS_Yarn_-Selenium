import { randomString } from '../common';
import { updateExperienceTemplate } from 'actions/templates';

export function createProperty(templateData, propertyType, name, key) {
  let reqName =
    name === undefined
      ? randomString.generate({ length: 12, charset: 'alphabetic', capitalization: 'lowercase' })
      : name;
  let reqKey =
    key === undefined ? randomString.generate({ length: 12, charset: 'alphabetic', capitalization: 'lowercase' }) : key;
  let propertiesArray = templateData.template.properties === undefined ? [] : templateData.template.properties;

  propertiesArray.push({
    name: reqName,
    key: reqKey,
    typeKey: propertyType
  });
  templateData.template.properties = propertiesArray;

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
      templateData.template.rowVersion = response.response.rowVersion;
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
  return updateExperienceTemplate(templateData, templatePayload)
    .exec()
    .then(response => {
      templateData.template.rowVersion = response.response.rowVersion;
      return response;
    });
}

export function deleteProperty(templateData) {
  let templatePayload = {
    id: templateData.template.id,
    name: templateData.template.name,
    key: templateData.template.key,
    properties: [],
    rowVersion: templateData.template.rowVersion
  };
  return updateExperienceTemplate(templateData, templatePayload)
    .exec()
    .then(response => {
      templateData.template = response.response;
      return response;
    });
}
