import * as lib from '../../common';
import * as categories from 'api/actions/categories'
import * as spaces from 'api/actions/spaces';
import * as organization from 'api/actions/organization';
import * as identity from 'api/actions/identity';
var schema, createResponse, listResponse;

var schemaCategory = lib.joi.object().keys({
  id: lib.joi.number().integer().required(),
  label: lib.joi.string().required()
});

describe.only('Categories API', () => {
  describe('createCategory()', () => {
    before('Initialise working Space', (done) => { 
      identity.postIdentity(lib.responseData.categories).then(() => { 
        return organization.postOrganization(lib.responseData.categories);
      }).then(() => {
        return spaces.postSpaceByOrganizationId(lib.responseData.categories)
      }).then((response) => {
        createResponse = categories.createCategory(lib.responseData.categories);
        done();
      });
    });

    it('Creates a category', () => {
      return createResponse.then((response) => {
        lib.joi.assert(response, schemaCategory);
      });
    });
  });

  describe('listCategories()', () => {
    before('get the current list', (done) => {
      listResponse = categories.listCategories(categories.category);
      done();
    });

    it('Lists all Categories', () => {
      return listResponse.then((response) => {
        schema = lib.joi.object().keys({
          categories: lib.joi.array().items(schemaCategory)
        });
        lib.joi.assert(response, schema);
      });
    });
  });
});