import { joi } from '../common';
import * as categories from 'actions/categories';
import * as spaces from 'actions/spaces';
import * as organization from 'actions/organization';
import * as identity from 'actions/identity';
import * as schemas from 'schemas/categorySchema';

const categoryData = new Object();
var createResponse, listResponse, renameResponse, moveConfirm, deleteConfirm;

describe('Categories Service', () => {
  describe('createCategory()', () => {
    before('Initialise working Space', done => {
      identity
        .postIdentity(categoryData)
        .then(() => {
          return organization.postOrganization(categoryData);
        })
        .then(() => {
          return spaces.postSpaceByOrganizationId(categoryData);
        })
        .then(() => {
          createResponse = categories.createCategory(categoryData, true);
          done();
        });
    });

    it('Creates a category', () => {
      return createResponse.then(response => {
        expect(response.status.code).to.equal(0);
        joi.assert(response.response, schemas.schemaCategory);
      });
    });
  });

  describe('listCategories()', () => {
    before('get the current list', done => {
      listResponse = categories.listCategories(categoryData);
      done();
    });

    it('Lists all Categories', () => {
      return listResponse.then(response => {
        expect(response.status.code).to.equal(0);
        joi.assert(response.response, schemas.schemaCategories);
      });
    });
  });

  describe('renameCategory()', () => {
    before('Send rename request', done => {
      renameResponse = categories.renameCategory(categoryData);
      done();
    });

    it('Renames the category', () => {
      return renameResponse.then(response => {
        expect(response.status.code).to.equal(0);
        expect(response.response.label).to.not.equal(categoryData.tribeCategoryOldLabel);
        joi.assert(response.response, schemas.schemaCategory);
      });
    });
  });

  describe('moveCategory()', () => {
    before('Send move request', done => {
      categories
        .createCategory(categoryData)
        .then(() => {
          return categories.moveCategory(categoryData);
        })
        .then(response => {
          expect(response.status.code).to.equal(0);
          moveConfirm = categories.listCategories(categoryData);
          done();
        });
    });

    it('Moves the category', () => {
      return moveConfirm.then(response => {
        expect(response.response.categories[0].id > response.response.categories[1].id).to.be.true;
      });
    });
  });

  describe('deleteCategory()', () => {
    before('Send delete request', done => {
      categories.deleteCategory(categoryData).then(response => {
        expect(response.status.code).to.equal(0);
        deleteConfirm = categories.listCategories(categoryData);
        done();
      });
    });

    it('Deletes the category', () => {
      return deleteConfirm.then(response => {
        let categories = response.response.categories;
        expect(categories).to.be.an('array');
        expect(categories).to.have.lengthOf(2);
        expect(categories[1]).to.have.property('isDefault', true);
        expect(categories[0].id).to.not.equal(categoryData.tribeCategoryID);
        expect(categories[1].id).to.not.equal(categoryData.tribeCategoryID);
      });
    });
  });
});
