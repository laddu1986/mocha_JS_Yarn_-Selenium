import { randomString } from '../common';
import { updateExperienceTemplate } from 'actions/templates';
import constants from 'constants.json';
import * as data from 'data/templateTestData';

export function createProperty(templateData, propertyType, name, key) {
  let reqName =
    name === undefined
      ? randomString.generate({ length: 12, charset: 'alphabetic', capitalization: 'lowercase' })
      : name;
  let reqKey =
    key === undefined ? randomString.generate({ length: 12, charset: 'alphabetic', capitalization: 'lowercase' }) : key;
  let propertiesArray = templateData.template.properties === undefined ? [] : templateData.template.properties;
  let propertyVal;
  switch (propertyType) {
    case constants.TemplateProperties.Types.Text:
      propertyVal = data.textVal;
      break;
    case constants.TemplateProperties.Types.Integer:
      propertyVal = data.intVal;
      break;
    case constants.TemplateProperties.Types.Switch:
      propertyVal = data.boolVal;
      break;
    case constants.TemplateProperties.Types.Date:
      propertyVal = data.dateVal;
      break;
    case constants.TemplateProperties.Types.Color:
      propertyVal = data.colorVal;
      break;
    case constants.TemplateProperties.Types.List:
      propertyVal = data.listVal;
      break;
  }

  propertiesArray.push({
    name: reqName,
    key: reqKey,
    typeKey: propertyType,
    appearanceKey: 'appearance_key_text',
    promptText: 'prompt_text',
    helpText: 'help_text',
    [propertyType]: propertyVal
  });

  let templatePayload = {
    id: templateData.template.id,
    name: templateData.template.name,
    key: templateData.template.key,
    thumbnailUrl: 'thumbnail_url',
    properties: propertiesArray,
    rowVersion: templateData.template.rowVersion
  };
  return updateExperienceTemplate(templateData, templatePayload)
    .exec()
    .then(response => {
      templateData.template.rowVersion = response.response.rowVersion;
      templateData.template.properties = propertiesArray;
      return response;
    })
    .catch(err => {
      return err;
    });
}

export function renameProperty(templateData) {
  let newName = randomString.generate({ length: 40, charset: 'alphabetic', capitalization: 'lowercase' });
  templateData.template.properties[0].name = newName;
  let templatePayload = {
    id: templateData.template.id,
    name: templateData.template.name,
    key: templateData.template.key,
    thumbnailUrl: 'thumbnail_url',
    properties: templateData.template.properties,
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
    thumbnailUrl: 'thumbnail_url',
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
