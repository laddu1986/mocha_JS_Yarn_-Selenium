import { randomString, post, orca, Context } from '../common';
//import * as Constants from '../constants.json';

export function createExperienceTemplate(returnTemplate, templateType, name, key) {
  (name = name === undefined ? `${randomString(8)}` : name),
    (key = key === undefined ? `${randomString({ length: 7, charset: 'alphabetic' })}` : key);
  const data = {
    query:
      'mutation createExperienceTemplate($input: CreateExperienceTemplateInput!) { createExperienceTemplate(input: $input) { template { id key type name rowVersion templateVersionId}}}',
    operationName: 'createExperienceTemplate',
    variables: {
      input: {
        fields: {
          key: key,
          name: name,
          thumbnailUrl: 'SchemDefault'
        },
        organizationId: Context.organizationId,
        spaceId: Context.spaceId,
        templateType
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any).then(response => {
    Object.assign(returnTemplate, response.response.body.data.createExperienceTemplate.template);
    return response;
  });
}

export function updateExperienceTemplate(returnTemplate) {
  var newName = `${randomString(8)}_new`;
  const data = {
    query:
      'mutation updateExperienceTemplate($input: UpdateExperienceTemplateInput!) { updateExperienceTemplate(input: $input) { template { id name key thumbnailUrl rowVersion properties{key typeKey name defaultValue appearanceKey promptText helpText localizable rules{constraint}}}}}',
    operationName: 'updateExperienceTemplate',
    variables: {
      input: {
        fields: {
          name: newName
        },
        organizationId: Context.organizationId,
        spaceId: Context.spaceId,
        templateId: returnTemplate.id,
        rowVersion: returnTemplate.rowVersion,
        templateVersionId: returnTemplate.templateVersionId
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any).then(response => {
    Object.assign(returnTemplate, response.response.body.data.updateExperienceTemplate.template);
    return response;
  });
}

export function getExperienceTemplate(returnTemplate) {
  const data = {
    query:
      'query experienceTemplate($organizationId: ID!, $spaceId: ID!, $templateId: ID!) { experienceTemplate(organizationId: $organizationId , spaceId: $spaceId, templateId: $templateId) { id name key thumbnailUrl rowVersion properties{key typeKey name defaultValue appearanceKey promptText helpText localizable rules{constraint}}}}',
    operationName: 'experienceTemplate',
    variables: {
      organizationId: Context.organizationId,
      spaceId: Context.spaceId,
      templateId: returnTemplate.id
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any).then(response => {
    Object.assign(returnTemplate, response.response.body.data.experienceTemplate);
    return response;
  });
}

export function addExperienceProperty(returnTemplate, returnProperty, typeKey) {
  const data = {
    query:
      'mutation addExperienceProperty($input: AddExperiencePropertyInput!) {  addExperienceProperty(input: $input) { template { rowVersion} property{id name}}}',
    operationName: 'addExperienceProperty',
    variables: {
      input: {
        index: 0,
        organizationId: Context.organizationId,
        spaceId: Context.spaceId,
        templateId: returnTemplate.id,
        templateVersionId: returnTemplate.templateVersionId,
        rowVersion: returnTemplate.rowVersion,
        typeKey
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any).then(response => {
    Object.assign(returnTemplate, response.response.body.data.addExperienceProperty.template);
    Object.assign(returnProperty, response.response.body.data.addExperienceProperty.property);
    return response;
  });
}

export function getExperienceProperty(templateData, returnProperty) {
  const data = {
    query:
      'query experienceProperty($organizationId: ID!, $spaceId: ID!, $templateId: ID!, $propertyId: ID!) {  experienceProperty(organizationId: $organizationId, spaceId: $spaceId, templateId: $templateId, propertyId: $propertyId){ id name key}}',
    operationName: 'experienceProperty',
    variables: {
      organizationId: Context.organizationId,
      propertyId: returnProperty.id,
      spaceId: Context.spaceId,
      templateId: templateData.id
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any).then(response => {
    Object.assign(returnProperty, response.response.body.data.experienceProperty);
    return response;
  });
}

export function updateExperienceProperty(returnTemplate, returnProperty, name, key) {
  name = name === undefined ? `${randomString(8)}` : name;
  key = key === undefined ? `${randomString({ length: 7, charset: 'alphabetic' })}` : key;
  const data = {
    query: `mutation updateExperienceProperty($input: UpdateExperiencePropertyInput!) { 
        updateExperienceProperty(input: $input) {
          templateUpdate { id rowVersion templateVersionId modifiedAt modifiedBy status }
          property { id name key appearanceKey promptText helpText localizable typeKey defaultValue }
        }
      }`,
    operationName: 'updateExperienceProperty',
    variables: {
      input: {
        fields: {
          key,
          name
        },
        propertyId: returnProperty.id,
        organizationId: Context.organizationId,
        spaceId: Context.spaceId,
        templateId: returnTemplate.id,
        templateVersionId: returnTemplate.templateVersionId,
        rowVersion: returnTemplate.rowVersion
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any).then(response => {
    Object.assign(returnTemplate, response.response.body.data.updateExperienceProperty.templateUpdate);
    Object.assign(returnProperty, response.response.body.data.updateExperienceProperty.property);
    return response;
  });
}

export function getExperiencesTemplate(responseData) {
  const data = {
    query:
      'query experienceTemplates($organizationId: ID!, $spaceId: ID!) { experienceTemplates(organizationId: $organizationId , spaceId: $spaceId) { id rowVersion key name}}',
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

export function removeExperienceProperty(responseData) {
  const data = {
    query:
      'mutation removeExperienceProperty($input: RemoveExperiencePropertyInput!) { removeExperienceProperty(input: $input) { template { id rowVersion}}}',
    operationName: 'removeExperienceProperty',
    variables: {
      input: {
        propertyId: responseData.propertyId,
        organizationId: responseData.orgID,
        rowVersion: responseData.expTemplateRowVersion,
        spaceId: responseData.spaceID,
        templateId: responseData.expTemplateID,
        templateVersionId: responseData.templateVersionId
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    responseData.expTemplateRowVersion = response.response.body.data.removeExperienceProperty.template.rowVersion;
    return response;
  });
}

export function commitExperienceTemplate(responseData) {
  const data = {
    query:
      'mutation commitExperienceTemplate($input: CommitExperienceTemplateInput!) { commitExperienceTemplate(input: $input) { template { rowVersion templateVersionId}}}',
    operationName: 'commitExperienceTemplate',
    variables: {
      input: {
        organizationId: responseData.orgID,
        spaceId: responseData.spaceID,
        templateId: responseData.expTemplateID,
        rowVersion: responseData.expTemplateRowVersion,
        templateVersionId: responseData.templateVersionId
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    responseData.expTemplateRowVersion = response.response.body.data.commitExperienceTemplate.template.rowVersion;
    return response;
  });
}

export function deleteExperienceTemplate(responseData) {
  const data = {
    query:
      'mutation deleteExperienceTemplate($input: DeleteExperienceTemplateInput!) { deleteExperienceTemplate(input: $input) }',
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
