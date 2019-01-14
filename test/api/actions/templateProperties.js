import { randomString } from '../common';
import { updateExperienceTemplate } from 'actions/templates';
import constants from 'constants.json';

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
      templateData.template.properties = propertiesArray;
      return response;
    });
}

export function createPropertyValidations(templateData, char) {
  let templatePayload = {
    id: templateData.template.id,
    name: templateData.template.name,
    key: templateData.template.key,
    properties: [
      {
        name: randomString.generate({ length: 12, charset: 'alphabetic', capitalization: 'lowercase' }),
        key: char,
        typeKey: constants.TemplateProperties.Types.int
      }
    ],
    rowVersion: templateData.template.rowVersion
  };
  return updateExperienceTemplate(templateData, templatePayload)
    .exec()
    .catch(response => {
      return response;
    });
}

export function renameProperty(templateData, type) {
  let newName = randomString.generate({ length: 40, charset: 'alphabetic', capitalization: 'lowercase' });
  templateData.template.properties[type].name = newName;
  let templatePayload = {
    id: templateData.template.id,
    name: templateData.template.name,
    key: templateData.template.key,
    properties: [
      {
        name: newName,
        key: templateData.template.properties[type].key,
        typeKey: templateData.template.properties[type].typeKey
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

export function deleteProperty(templateData, type) {
  let property = [];
  for (let i = 0; i < templateData.template.properties.length; i++) {
    if (type == templateData.template.properties[i].typeKey) continue;
    else {
      property.push({
        name: templateData.template.properties[i].name,
        key: templateData.template.properties[i].key,
        typeKey: templateData.template.properties[i].typeKey
      });
    }
  }

  let templatePayload = {
    id: templateData.template.id,
    name: templateData.template.name,
    key: templateData.template.key,
    properties: property,
    rowVersion: templateData.template.rowVersion
  };
  return updateExperienceTemplate(templateData, templatePayload)
    .exec()
    .then(response => {
      templateData.template = response.response;
      return response;
    });
}
