import * as lib from '../../common';
import * as categories from 'api/actions/categories'
import * as spaces from 'api/actions/spaces';
import * as organization from 'api/actions/organization';
import * as identity from 'api/actions/identity';

var schema, createResponse, listResponse, renameResponse, moveConfirm, deleteConfirm;

var schemaCategory = lib.joi.object().keys({
  id: lib.joi.number().integer().required(),
  label: lib.joi.string().optional(),
  isDefault: lib.joi.boolean().optional()
});

describe('Categories API', () => {
  describe('createCategory()', () => {
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

  describe('moveCategory()', () => {
    before('Send move request', (done) => {
      categories.createCategory(lib.responseData.categories).then(() => {
        return categories.moveCategory(categories.category);
      }).then(() => {
        moveConfirm = categories.listCategories(categories.category);
        done();
      })
    });

    it('Moves the category', () => {
      return moveConfirm.then((response) => {
       expect(response.categories[0].id > response.categories[1].id).to.be.true;
      })
    });
  });

  describe('deleteCategory()', () => {
    before('Send delete request', (done) => {
      categories.deleteCategory(categories.category).then(() => {
        deleteConfirm = categories.listCategories(categories.category);
        done();
      })
    });
    
    it('Deletes the category', () => {
      return deleteConfirm.then((response) => {
        expect(response.categories).to.be.an('array');
        expect(response.categories).to.have.lengthOf(2);
        expect(response.categories[1]).to.have.property('isDefault', true);
        expect(response.categories[0].id).to.not.equal(categories.category.id);
        expect(response.categories[1].id).to.not.equal(categories.category.id);
      });
    });
  })
});