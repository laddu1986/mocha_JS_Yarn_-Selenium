import { randomString, post, orca } from '../common';
import * as Constants from '../constants.json';
var key,
  p1,
  k1,
  p2,
  k2,
  p3,
  k3,
  properties = { p1, k1, p2, k2, p3, k3 };
properties.p1 = randomString.generate(8);
properties.p2 = randomString.generate(8);
properties.p3 = randomString.generate(8);
properties.k1 = randomString.generate({ length: 6, charset: 'alphabetic' });
properties.k2 = randomString.generate({ length: 6, charset: 'alphabetic' });
properties.k3 = randomString.generate({ length: 6, charset: 'alphabetic' });

export function createExperienceTemplate(responseData) {
  var name = `${randomString.generate(8)}`;
  key = `${randomString.generate({
    length: 7,
    charset: 'alphabetic'
  })}`;
  const data = {
    query:
      'mutation createExperienceTemplate($input: CreateExperienceTemplateInput!) { createExperienceTemplate(input: $input) { template { id key name thumbnailUrl rowVersion properties{key}}}}',
    operationName: 'createExperienceTemplate',
    variables: {
      input: {
        fields: {
          key: key,
          name: name
        },
        organizationId: responseData.orgID,
        spaceId: responseData.spaceID
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    responseData.experienceName = name;
    responseData.experienceKey = key;
    responseData.expTemplateID = response.response.body.data.createExperienceTemplate.template.id;
    responseData.expTemplateRowVersion = response.response.body.data.createExperienceTemplate.template.rowVersion;
    return response;
  });
}

export function updateExperienceTemplate(responseData) {
  var newName = `${randomString.generate(8)}_new`;
  const data = {
    query:
      'mutation updateExperienceTemplate($input: UpdateExperienceTemplateInput!) { updateExperienceTemplate(input: $input) { template { id name key thumbnailUrl rowVersion properties{key typeKey name appearanceKey defaultValue appearanceKey promptText helpText localizable appliedValidations{key name validationStructure}}}}}',
    operationName: 'updateExperienceTemplate',
    variables: {
      input: {
        fields: {
          key: key,
          name: newName,
          properties: [
            { name: properties.p1, key: properties.k1, typeKey: Constants.TemplateProperties.Types.text },
            { name: properties.p2, key: properties.k2, typeKey: Constants.TemplateProperties.Types.bool },
            { name: properties.p3, key: properties.k3, typeKey: Constants.TemplateProperties.Types.int }
          ]
        },
        organizationId: responseData.orgID,
        spaceId: responseData.spaceID,
        templateId: responseData.expTemplateID,
        rowVersion: responseData.expTemplateRowVersion
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    responseData.experienceNewName = newName;
    responseData.expTemplateRowVersion = response.response.body.data.updateExperienceTemplate.template.rowVersion;
    responseData.property1 = properties.p1;
    responseData.property2 = properties.p2;
    responseData.property3 = properties.p3;
    responseData.key1 = properties.k1;
    responseData.key2 = properties.k2;
    responseData.key3 = properties.k3;
    return response;
  });
}

export function getExperienceTemplate(responseData) {
  const data = {
    query:
      'query experienceTemplate($organizationId: ID!, $spaceId: ID!, $templateId: ID!) { experienceTemplate(organizationId: $organizationId , spaceId: $spaceId, templateId: $templateId) { id name key thumbnailUrl rowVersion properties{key typeKey name appearanceKey defaultValue appearanceKey promptText helpText localizable appliedValidations{key name validationStructure}}}}',
    operationName: 'experienceTemplate',
    variables: {
      organizationId: responseData.orgID,
      spaceId: responseData.spaceID,
      templateId: responseData.expTemplateID
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    return response;
  });
}

export function getExperiencesTemplate(responseData) {
  const data = {
    query:
      'query experienceTemplates($organizationId: ID!, $spaceId: ID!) { experienceTemplates(organizationId: $organizationId , spaceId: $spaceId) {templates{ id rowVersion key name}}}',
    operationName: 'experienceTemplates',
    variables: {
      organizationId: responseData.orgID,
      spaceId: responseData.spaceID
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    return response;
  });
}

export function deleteExperienceTemplate(responseData) {
  const data = {
    query:
      'mutation deleteExperienceTemplate($input: DeleteExperienceTemplateInput!) { deleteExperienceTemplate(input: $input) {templateId}}',
    operationName: 'deleteExperienceTemplate',
    variables: {
      input: {
        organizationId: responseData.orgID,
        spaceId: responseData.spaceID,
        templateId: responseData.expTemplateID,
        rowVersion: responseData.expTemplateRowVersion
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    return response;
  });
}
