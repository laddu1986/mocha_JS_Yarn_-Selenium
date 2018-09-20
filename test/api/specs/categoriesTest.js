import * as lib from '../../common';
import * as categories from 'api/actions/categories'
import * as spaces from 'api/actions/spaces';
import * as organization from 'api/actions/organization';
import * as identity from 'api/actions/identity';

const categoryData = new Object();
var schema, createResponse, listResponse, renameResponse, moveConfirm, deleteConfirm;

var schemaCategory = lib.joi.object().keys({
  id: lib.joi.number().integer().required(),
  label: lib.joi.string().optional(),
  isDefault: lib.joi.boolean().optional()
});

describe('Categories Service', () => {
  describe('createCategory()', () => {
    before('Initialise working Space', (done) => { 
      identity.postIdentity(categoryData).then(() => { 
        return organization.postOrganization(categoryData);
      }).then(() => {
        return spaces.postSpaceByOrganizationId(categoryData)
      }).then((response) => {
        createResponse = categories.createCategory(categoryData, true);
        done();
      });
    });

    it('Creates a category', () => {
      return createResponse.then((response) => {
        expect(response.status.code).to.equal(0);
        lib.joi.assert(response.response, schemaCategory);
      });
    });
  });

  describe('listCategories()', () => {
    before('get the current list', (done) => {
      listResponse = categories.listCategories(categoryData);
      done();
    });

    it('Lists all Categories', () => {
      return listResponse.then((response) => {
        expect(response.status.code).to.equal(0);
        schema = lib.joi.object().keys({
          categories: lib.joi.array().items(schemaCategory)
        });
        lib.joi.assert(response.response, schema);
      });
    });
  });

  describe('renameCategory()', () => {
    before('Send rename request', (done) => {
      renameResponse = categories.renameCategory(categoryData);
      done();
    });

    it('Renames the category', () => {
      return renameResponse.then((response) => {
        expect(response.status.code).to.equal(0);
        expect(response.response.label).to.not.equal(categoryData.oldLabel);
        lib.joi.assert(response.response, schemaCategory);
      });
    });
  });

  describe('moveCategory()', () => {
    before('Send move request', (done) => {
      categories.createCategory(categoryData).then(() => {
        return categories.moveCategory(categoryData);
      }).then((response) => {
        expect(response.status.code).to.equal(0);
        moveConfirm = categories.listCategories(categoryData);
        done();
      })
    });

    it('Moves the category', () => {
      return moveConfirm.then((response) => {
       expect(response.response.categories[0].id > response.response.categories[1].id).to.be.true;
      })
    });
  });

  describe('deleteCategory()', () => {
    before('Send delete request', (done) => {
      categories.deleteCategory(categoryData).then((response) => {
        expect(response.status.code).to.equal(0);
        deleteConfirm = categories.listCategories(categoryData);
        done();
      })
    });
    
    it('Deletes the category', () => {
      return deleteConfirm.then((response) => {
        let categories = response.response.categories
        expect(categories).to.be.an('array');
        expect(categories).to.have.lengthOf(2);
        expect(categories[1]).to.have.property('isDefault', true);
        expect(categories[0].id).to.not.equal(categoryData.id);
        expect(categories[1].id).to.not.equal(categoryData.id);
      });
    });
  })
});