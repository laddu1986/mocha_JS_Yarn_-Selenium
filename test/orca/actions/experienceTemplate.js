import { randomString, post, orca } from '../common';
import * as Constants from '../constants.json';

export function createExperienceTemplate(responseData) {
  let name = `${randomString(8)}`,
    key = `${randomString({ length: 7, charset: 'alphabetic' })}`;
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
        organizationId: responseData.orgID,
        spaceId: responseData.spaceID,
        templateType: Constants.Experience.Types.FIXED
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
    responseData.templateVersionId = response.response.body.data.createExperienceTemplate.template.templateVersionId;
    responseData.expTemplateRowVersion = response.response.body.data.createExperienceTemplate.template.rowVersion;
    return response;
  });
}

export function updateExperienceTemplate(responseData) {
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
    responseData.experienceNewName = newName;
    responseData.expTemplateRowVersion = response.response.body.data.updateExperienceTemplate.template.rowVersion;
    return response;
  });
}

export function getExperienceTemplate(responseData) {
  const data = {
    query:
      'query experienceTemplate($organizationId: ID!, $spaceId: ID!, $templateId: ID!) { experienceTemplate(organizationId: $organizationId , spaceId: $spaceId, templateId: $templateId) { id name key thumbnailUrl rowVersion properties{key typeKey name defaultValue appearanceKey promptText helpText localizable rules{constraint}}}}',
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
  return post(any, responseData);
}

export function addExperienceProperty(responseData, type) {
  const data = {
    query:
      'mutation addExperienceProperty($input: AddExperiencePropertyInput!) {  addExperienceProperty(input: $input) { template { rowVersion} property{id name}}}',
    operationName: 'addExperienceProperty',
    variables: {
      input: {
        index: 0,
        organizationId: responseData.orgID,
        spaceId: responseData.spaceID,
        templateId: responseData.expTemplateID,
        templateVersionId: responseData.templateVersionId,
        rowVersion: responseData.expTemplateRowVersion,
        typeKey: type
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    responseData.expTemplateRowVersion = response.response.body.data.addExperienceProperty.template.rowVersion;
    responseData.propertyId = response.response.body.data.addExperienceProperty.property.id;
    return response;
  });
}

export function getExperienceProperty(responseData) {
  const data = {
    query:
      'query experienceProperty($organizationId: ID!, $spaceId: ID!, $templateId: ID!, $propertyId: ID!) {  experienceProperty(organizationId: $organizationId, spaceId: $spaceId, templateId: $templateId, propertyId: $propertyId){ id name key}}',
    operationName: 'experienceProperty',
    variables: {
      organizationId: responseData.orgID,
      propertyId: responseData.propertyId,
      spaceId: responseData.spaceID,
      templateId: responseData.expTemplateID
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData);
}

export function updateExperienceProperty(responseData) {
  let name = `${randomString(8)}`,
    key = `${randomString({ length: 7, charset: 'alphabetic' })}`;
  const data = {
    query:
      'mutation updateExperienceProperty($input: UpdateExperiencePropertyInput!) { updateExperienceProperty(input: $input) {templateUpdate {rowVersion}}}',
    operationName: 'updateExperienceProperty',
    variables: {
      input: {
        fields: {
          key: key,
          name: name
        },
        propertyId: responseData.propertyId,
        organizationId: responseData.orgID,
        spaceId: responseData.spaceID,
        templateId: responseData.expTemplateID,
        templateVersionId: responseData.templateVersionId,
        rowVersion: responseData.expTemplateRowVersion
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    responseData.expTemplateRowVersion = response.response.body.data.updateExperienceProperty.templateUpdate.rowVersion;
    return response;
  });
}

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

export function getExperiencesTemplate(responseData) {
  const data = {
    query:
      'query experienceTemplates($input: ExperienceTemplateSearchInput!) { experienceTemplates(input: $input) { id rowVersion key name}}',
    operationName: 'experienceTemplates',
    variables: {
      input: {
        organizationId: responseData.orgID,
        spaceId: responseData.spaceID
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData);
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

export function toggleExperiencePropertyRule(responseData, propertyId, ruleName, type) {
  const data = {
    query: `mutation ${type}($input: ${type.charAt(0).toUpperCase() +
      type.slice(
        1
      )}Input!) { ${type}(input: $input) {templateUpdate{id rowVersion templateVersionId} property{ id rules {min max mode pattern errorMessage isRequired}}}}`,
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
  return post(any, responseData);
}
