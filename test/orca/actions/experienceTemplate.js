import { randomString, post, orca } from '../common';

export function createExperienceTemplate(responseData) {
  var name = `${randomString.generate(8)}`;
  const data = {
    query:
      'mutation createExperienceTemplate($input: CreateExperienceTemplateInput!) { createExperienceTemplate(input: $input) { template { id label rowVersion key }}}',
    variables: {
      input: {
        fields: {
          key: name,
          label: name
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
    responseData.expTemplateID = response.response.body.data.createExperienceTemplate.template.id;
    responseData.expTemplateRowVersion = response.response.body.data.createExperienceTemplate.template.rowVersion;
    return response;
  });
}

export function updateExperienceTemplate(responseData) {
  var newName = `${randomString.generate(8)}_new`;
  const data = {
    query:
      'mutation updateExperienceTemplate($input: UpdateExperienceTemplateInput!) { updateExperienceTemplate(input: $input) { template { id label rowVersion key }}}',
    variables: {
      input: {
        fields: {
          key: newName,
          label: newName
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
    return response;
  });
}

export function getExperienceTemplate(responseData) {
  const data = {
    query:
      'query experienceTemplate($organizationId: ID!, $spaceId: ID!, $templateId: ID!) { experienceTemplate(organizationId: $organizationId , spaceId: $spaceId, templateId: $templateId) { id label rowVersion key }}',
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
      'query experienceTemplates($organizationId: ID!, $spaceId: ID!) { experienceTemplates(organizationId: $organizationId , spaceId: $spaceId) { id label rowVersion }}',
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
      'mutation deleteExperienceTemplate($input: DeleteExperienceTemplateInput!) { deleteExperienceTemplate(input: $input)}',
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
