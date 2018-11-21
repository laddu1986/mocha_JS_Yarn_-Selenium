import { joi } from '../common';
import * as categories from 'actions/categories';
import * as spaces from 'actions/spaces';
import * as organization from 'actions/organization';
import * as identity from 'actions/identity';
import * as schemas from 'schemas/categorySchema';

const categoryData = new Object();
var createResponse, listResponse, renameResponse, moveResponse, moveConfirm, deleteResponse, deleteConfirm;

describe('Categories Service', () => {
  describe('createCategory()', () => {
    before('Initialise working Space', async () => {
      await identity.postIdentity(categoryData);
      await organization.postOrganization(categoryData);
      await spaces.postSpaceByOrganizationId(categoryData);
      createResponse = await categories.createCategory(categoryData, true);
    });

    it('Creates a category', () => {
      expect(createResponse.status.code).to.equal(0);
      joi.assert(createResponse.response, schemas.schemaCategory);
    });
  });

  describe('listCategories()', () => {
    before('get the current list', async () => {
      listResponse = await categories.listCategories(categoryData);
    });

    it('Lists all Categories', () => {
      expect(listResponse.status.code).to.equal(0);
      joi.assert(listResponse.response, schemas.schemaCategories);
    });
  });

  describe('renameCategory()', () => {
    before('Send rename request', async () => {
      renameResponse = await categories.renameCategory(categoryData);
    });

    it('Renames the category', () => {
      expect(renameResponse.status.code).to.equal(0);
      expect(renameResponse.response.label).to.not.equal(categoryData.tribeCategoryOldLabel);
      joi.assert(renameResponse.response, schemas.schemaCategory);
    });
  });

  describe('moveCategory()', () => {
    before('Send move request', async () => {
      await categories.createCategory(categoryData);
      moveResponse = await categories.moveCategory(categoryData);
      moveConfirm = await categories.listCategories(categoryData);
    });

    it('Moves the category', () => {
      expect(moveResponse.status.code).to.equal(0);
      expect(moveConfirm.response.categories[0].id > moveConfirm.response.categories[1].id).to.be.true;
    });
  });

  describe('deleteCategory()', () => {
    before('Send delete request', async () => {
      deleteResponse = await categories.deleteCategory(categoryData);
      deleteConfirm = await categories.listCategories(categoryData);
    });

    it('Deletes the category', () => {
      let categories = deleteConfirm.response.categories;
      expect(deleteResponse.status.code).to.equal(0);
      expect(categories).to.be.an('array');
      expect(categories).to.have.lengthOf(2);
      expect(categories[1]).to.have.property('isDefault', true);
      expect(categories[0].id).to.not.equal(categoryData.tribeCategoryID);
      expect(categories[1].id).to.not.equal(categoryData.tribeCategoryID);
    });
  });
});
