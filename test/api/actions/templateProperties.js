import { randomString } from '../common';
import { updateExperienceTemplate } from 'actions/templates';
import * as data from 'data/templateTestData';

export function createProperty(templateData, propertyType, name, key) {
  let reqName =
    name === undefined ? randomString({ length: 12, charset: 'alphabetic', capitalization: 'lowercase' }) : name;
  let reqKey =
    key === undefined ? randomString({ length: 12, charset: 'alphabetic', capitalization: 'lowercase' }) : key;
  let propertiesArray = templateData.template.properties === undefined ? [] : templateData.template.properties;
  let propertyVal = data.properties[propertyType];
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
  let newName = randomString({ length: 40, charset: 'alphabetic', capitalization: 'lowercase' });
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
