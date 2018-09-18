import * as lib from '../../common';
import * as categories from 'api/actions/categories'
import * as spaces from 'api/actions/spaces';
import * as organization from 'api/actions/organization';
import * as identity from 'api/actions/identity';
var schema, createResponse, listResponse, renameResponse, moveResponse, deleteConfirm;

var schemaCategory = lib.joi.object().keys({
  id: lib.joi.number().integer().required(),
  label: lib.joi.string().optional(),
  isDefault: lib.joi.boolean().optional()
});

describe.only('Categories API', () => {
  describe.only('createCategory()', () => {
    before('Initialise working Space', (done) => { 
      identity.postIdentity(lib.responseData.categories).then(() => { 
        return organization.postOrganization(lib.responseData.categories);
      }).then(() => {
        return spaces.postSpaceByOrganizationId(lib.responseData.categories)
      }).then((response) => {
        createResponse = categories.createCategory(lib.responseData.categories, true);
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

  describe('renameCategory()', () => {
    before('Send rename request', (done) => {
      renameResponse = categories.renameCategory(categories.category);
      done();
    });

    //TODO: assert new title
    it('Renames the category', () => {
      return renameResponse.then((response) => {
        lib.joi.assert(response, schemaCategory);
      });
    });
  });

  describe.only('moveCategory()', () => {
    /*
      TODO: 
        Create a category
        Fetch the list of all categories
        Verify that the category has moved
    */
    before('Send move request', (done) => {
      categories.createCategory(lib.responseData.categories).then(() => {
        return categories.moveCategory(categories.category);
      }).then(() => {
        moveResponse = categories.listCategories(categories.category);
        done()
      })
    });

    it('Moves the category', () => {
      return moveResponse.then((response) => {
        console.log(response);
      })
    });
  });

  describe.skip('deleteCategory()', () => {
    before('Delete a category', (done) => {
      categories.delateCategory(testCategory).then(() => {
        deleteConfirm = categories.listCategories(categories.category);
        done();
      })
    })
    
  })
});