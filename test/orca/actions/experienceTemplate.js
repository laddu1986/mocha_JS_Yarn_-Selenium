import { randomString, post, orca, Context } from '../common';
//import * as Constants from '../constants.json';

export function createExperienceTemplate(returnTemplate, templateType, name, key) {
  (name = name === undefined ? `${randomString(8)}` : name),
    (key = key === undefined ? `${randomString({ length: 7, charset: 'alphabetic' })}` : key);
  const data = {
    query: `mutation createExperienceTemplate($input: CreateExperienceTemplateInput!) { 
        createExperienceTemplate(input: $input) { 
          template { id key type name rowVersion templateVersionId}
        }
      }`,
    operationName: 'createExperienceTemplate',
    variables: {
      input: {
        fields: {
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

export function updateExperienceTemplate(returnTemplate, name, key) {
  (name = name === undefined ? `${randomString(8)}_new` : name),
    (key = key === undefined ? `${randomString({ length: 7, charset: 'alphabetic' })}` : key);
  const data = {
    query: `mutation updateExperienceTemplate($input: UpdateExperienceTemplateInput!) { 
        updateExperienceTemplate(input: $input) { 
          template { 
            id name key thumbnailUrl rowVersion 
            properties{
              key typeKey name defaultValue appearanceKey promptText helpText localizable 
              rules{
                constraint
      }}}}}`,
    operationName: 'updateExperienceTemplate',
    variables: {
      input: {
        fields: {
          name,
          key
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
    query: `query experienceTemplate($organizationId: ID!, $spaceId: ID!, $templateId: ID!) { 
        experienceTemplate(organizationId: $organizationId , spaceId: $spaceId, templateId: $templateId) { 
          id name key thumbnailUrl rowVersion properties{key typeKey name defaultValue appearanceKey promptText helpText localizable rules{constraint}
        }
      }
    }`,
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

//TODO: Return full details here
export function moveExperienceProperty(responseData, index) {
  const data = {
    query:
      'mutation moveExperienceProperty($input: MoveExperiencePropertyInput!) { moveExperienceProperty(input: $input) { template { id rowVersion}}}',
    operationName: 'moveExperienceProperty',
    variables: {
      input: {
        fields: {
          index
        },
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
    responseData.expTemplateRowVersion = response.response.body.data.moveExperienceProperty.template.rowVersion;
    return response;
  });
}

export function getExperienceTemplates() {
  const data = {
    query: `query experienceTemplates($input: ExperienceTemplateSearchInput!) { 
        experienceTemplates(input: $input) { 
          id templateVersionId modifiedAt modifiedBy type key name thumbnailUrl rowVersion status
        }
      }`,
    operationName: 'experienceTemplates',
    variables: {
      input: {
        organizationId: Context.organizationId,
        spaceId: Context.spaceId
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any);
}

export function removeExperienceProperty(returnTemplate, propertyData) {
  const data = {
    query: `mutation removeExperienceProperty($input: RemoveExperiencePropertyInput!) { 
        removeExperienceProperty(input: $input) { 
          template { 
            id rowVersion templateVersionId modifiedAt modifiedBy type key name thumbnailUrl rowVersion status
          }
        }
      }`,
    operationName: 'removeExperienceProperty',
    variables: {
      input: {
        propertyId: propertyData.id,
        organizationId: Context.organizationId,
        rowVersion: returnTemplate.rowVersion,
        spaceId: Context.spaceId,
        templateId: returnTemplate.id,
        templateVersionId: returnTemplate.templateVersionId
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any).then(response => {
    Object.assign(returnTemplate, response.response.body.data.removeExperienceProperty.template);
    return response;
  });
}

//TODO: this
export function toggleExperiencePropertyRule(responseData, propertyId, ruleName, type) {
  const data = {
    query: `mutation ${type}($input: ${type.charAt(0).toUpperCase() + type.slice(1)}Input!) { 
      ${type}(input: $input) {
        templateUpdate{id rowVersion templateVersionId
        } 
        property { 
          id rules { min max mode pattern errorMessage isRequired }
        }
      }
    }`,
    operationName: type,
    variables: {
      input: {
        propertyId,
        organizationId: responseData.orgID,
        spaceId: responseData.spaceID,
        templateId: responseData.expTemplateID,
        templateVersionId: responseData.templateVersionId,
        rowVersion: responseData.expTemplateRowVersion,
        ruleKey: ruleName
      }
    }
  };

  const any = {
    api: orca,
    data: data
  };

  return post(any, responseData).then(response => {
    if (type == 'enableExperiencePropertyRule') {
      responseData.expTemplateRowVersion =
        response.response.body.data.enableExperiencePropertyRule.templateUpdate.rowVersion;
      responseData.templateVersionId =
        response.response.body.data.enableExperiencePropertyRule.templateUpdate.templateVersionId;
    } else {
      responseData.expTemplateRowVersion =
        response.response.body.data.disableExperiencePropertyRule.templateUpdate.rowVersion;
      responseData.templateVersionId =
        response.response.body.data.disableExperiencePropertyRule.templateUpdate.templateVersionId;
    }

    return response;
  });
}

export function updateExperiencePropertyRule(responseData, propertyId, propertyType, ruleName, ruleData) {
  const data = {
    query:
      'mutation updateExperiencePropertyRule($input: UpdateExperiencePropertyRuleInput!) { updateExperiencePropertyRule(input: $input) {templateUpdate{id rowVersion} property{id rules {min max mode pattern errorMessage isRequired}}}}',
    operationName: 'updateExperiencePropertyRule',
    variables: {
      input: {
        fields: ruleData,
        propertyId,
        organizationId: responseData.orgID,
        spaceId: responseData.spaceID,
        templateId: responseData.expTemplateID,
        templateVersionId: responseData.templateVersionId,
        rowVersion: responseData.expTemplateRowVersion,
        ruleKey: ruleName,
        propertyType
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    responseData.expTemplateRowVersion =
      response.response.body.data.updateExperiencePropertyRule.templateUpdate.rowVersion;
    return response;
  });
}

export function commitExperienceTemplate(returnTemplate) {
  const data = {
    query: `mutation commitExperienceTemplate($input: CommitExperienceTemplateInput!) { 
        commitExperienceTemplate(input: $input) {
          template { 
            id templateVersionId modifiedAt modifiedBy type key name thumbnailUrl rowVersion status
          }
          instanceIds
        }
      }`,
    operationName: 'commitExperienceTemplate',
    variables: {
      input: {
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
    Object.assign(returnTemplate, response.response.body.data.commitExperienceTemplate.template);
    return response;
  });
}

export function deleteExperienceTemplate(returnTemplate) {
  const data = {
    query: `mutation deleteExperienceTemplate($input: DeleteExperienceTemplateInput!) { 
        deleteExperienceTemplate(input: $input) 
      }`,
    operationName: 'deleteExperienceTemplate',
    variables: {
      input: {
        organizationId: Context.organizationId,
        spaceId: Context.spaceId,
        templateId: returnTemplate.id,
        rowVersion: returnTemplate.rowVersion
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any);
}
