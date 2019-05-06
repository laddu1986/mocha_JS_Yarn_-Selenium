import { randomString, post, orca, Context } from '../common';

export function createExperienceTemplate(returnTemplate, templateType, name, key) {
  name = name === undefined ? `${randomString(8)}` : name;
  key = key === undefined ? `${randomString({ length: 7, charset: 'alphabetic' })}` : key;
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
          name,
          key,
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

export function moveExperienceProperty(returnTemplate, propertyToMove, index) {
  const data = {
    query: `mutation moveExperienceProperty($input: MoveExperiencePropertyInput!) { 
        moveExperienceProperty(input: $input) { 
          template { 
            id rowVersion
          }
        }
      }`,
    operationName: 'moveExperienceProperty',
    variables: {
      input: {
        fields: {
          index
        },
        propertyId: propertyToMove.id,
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
    Object.assign(returnTemplate, response.response.body.data.moveExperienceProperty.template);
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
    for (var key in propertyData) {
      delete propertyData[key];
    } // Empty the property data object
    return response;
  });
}

export function toggleExperiencePropertyRule(returnTemplate, returnProperty, ruleName, type) {
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
        propertyId: returnProperty.id,
        organizationId: Context.organizationId,
        spaceId: Context.spaceId,
        templateId: returnTemplate.id,
        templateVersionId: returnTemplate.templateVersionId,
        rowVersion: returnTemplate.rowVersion,
        ruleKey: ruleName
      }
    }
  };

  const any = {
    api: orca,
    data: data
  };

  return post(any).then(response => {
    Object.assign(returnTemplate, response.response.body.data[type].templateUpdate);
    Object.assign(returnProperty, response.response.body.data[type].property);
    return response;
  });
}

export function updateExperiencePropertyRule(returnTemplate, returnProperty, ruleKey, ruleData) {
  const data = {
    query: `mutation updateExperiencePropertyRule($input: UpdateExperiencePropertyRuleInput!) { 
        updateExperiencePropertyRule(input: $input) {
          templateUpdate {
            id rowVersion 
          } 
          property {
            id rules {min max mode pattern errorMessage isRequired}
          }
        }
      }`,
    operationName: 'updateExperiencePropertyRule',
    variables: {
      input: {
        fields: ruleData,
        propertyId: returnProperty.id,
        organizationId: Context.organizationId,
        spaceId: Context.spaceId,
        templateId: returnTemplate.id,
        templateVersionId: returnTemplate.templateVersionId,
        rowVersion: returnTemplate.rowVersion,
        ruleKey,
        propertyType: returnProperty.typeKey
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any).then(response => {
    Object.assign(returnTemplate, response.response.body.data.updateExperiencePropertyRule.templateUpdate);
    Object.assign(returnProperty);
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
