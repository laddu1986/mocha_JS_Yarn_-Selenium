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
  if (propertyType == constants.TemplateProperties.Types.text) propertyVal = data.textVal;
  else if (propertyType == constants.TemplateProperties.Types.int) propertyVal = data.intVal;
  else if (propertyType == constants.TemplateProperties.Types.bool) propertyVal = data.boolVal;

  propertiesArray.push({
    name: reqName,
    key: reqKey,
    typeKey: propertyType,
    appearanceKey: 'appearance_key_text',
    prompt_text: 'prompt_text',
    help_text: 'help_text',
    localizable: true,
    [propertyType]: propertyVal
  });

  let templatePayload = {
    id: templateData.template.id,
    name: templateData.template.name,
    key: templateData.template.key,
    thumbnailUrl: 'thumbnail_url_text',
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

export function renameProperty(templateData, type) {
  let newName = randomString.generate({ length: 40, charset: 'alphabetic', capitalization: 'lowercase' });
  templateData.template.properties[type].name = newName;
  let templatePayload = {
    id: templateData.template.id,
    name: templateData.template.name,
    key: templateData.template.key,
    thumbnailUrl: 'thumbnail_url_text',
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

export function deleteProperty(templateData, type) {
  // this will be re-evaluated after related bug is fixed.
  let propertyType,
    typeVal,
    property = [];
  for (let i = 0; i < templateData.template.properties.length; i++) {
    if (type == templateData.template.properties[i].typeKey) continue;
    else {
      if (templateData.template.properties[i].typeKey == constants.TemplateProperties.Types.text) {
        propertyType = constants.TemplateProperties.Types.text;
        typeVal = data.textVal;
      } else if (templateData.template.properties[i].typeKey == constants.TemplateProperties.Types.bool) {
        propertyType = constants.TemplateProperties.Types.bool;
        typeVal = data.boolVal;
      } else if (templateData.template.properties[i].typeKey == constants.TemplateProperties.Types.int) {
        propertyType = constants.TemplateProperties.Types.int;
        typeVal = data.intVal;
      }
      property.push({
        name: templateData.template.properties[i].name,
        key: templateData.template.properties[i].key,
        typeKey: templateData.template.properties[i].typeKey,
        appearanceKey: templateData.template.properties[i].appearanceKey,
        prompt_text: templateData.template.properties[i].promptText,
        help_text: templateData.template.properties[i].helpText,
        localizable: templateData.template.properties[i].localizable,
        [propertyType]: typeVal
      });
    }
  }

  let templatePayload = {
    id: templateData.template.id,
    name: templateData.template.name,
    key: templateData.template.key,
    thumbnailUrl: 'thumbnail_url_text',
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
