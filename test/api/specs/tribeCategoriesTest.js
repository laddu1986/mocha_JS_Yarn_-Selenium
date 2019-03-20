import { joi } from '../common';
import * as categories from 'actions/tribeCategories';
import * as spaces from 'actions/spaces';
import * as organization from 'actions/organization';
import * as identity from 'actions/identity';
import * as schemas from 'schemas/categorySchema';

const categoryData = new Object();

describe('@segment Tribes Service', () => {
  before('Initialise working Space', async () => {
    await identity.postIdentity(categoryData);
    await organization.postOrganization(categoryData);
    await spaces.postSpaceByOrganizationId(categoryData);
  });

  it('C1295508 createCategory() creates a category in a given space', async () => {
    let createResponse = await categories.createCategory(categoryData);
    expect(createResponse.status.code).to.equal(0);
    joi.assert(createResponse.response, schemas.schemaCategory);
  });

  it('C1295509 listCategories() lists all categories for the given space', async () => {
    let listResponse = await categories.listCategories(categoryData);
    expect(listResponse.status.code).to.equal(0);
    joi.assert(listResponse.response, schemas.schemaCategories);
  });

  it('C1295510 renameCategory() renames the provided category', async () => {
    let renameResponse = await categories.renameCategory(categoryData);
    expect(renameResponse.status.code).to.equal(0);
    expect(renameResponse.response.label).to.equal(categoryData.tribeCategory.label);
    joi.assert(renameResponse.response, schemas.schemaCategory);
  });

  it('C1295511 moveCategory() sends a request to move a category', async () => {
    categoryData.tribeCategoryOld = categoryData.tribeCategory; // Save old category for clean up after testing
    await categories.createCategory(categoryData); // New category is saved into .tribeCategory
    let moveResponse = await categories.moveCategory(categoryData, '0'); // 0 ensures that the new category is being moved to the start
    expect(moveResponse.status.code).to.equal(0);
  });

  it('C1720491 moveCategory() moves the category to the desired location', async () => {
    let moveConfirm = await categories.listCategories(categoryData);
    expect(moveConfirm.response.categories[0].id > moveConfirm.response.categories[1].id).to.be.true;
  });

  it('C1295512 deleteCategory() sends a request to delete a category', async () => {
    let deleteResponse = await categories.deleteCategory(categoryData);
    expect(deleteResponse.status.code).to.equal(0);
  });

  it('C1720492 deleteCategory() deleted the provided category and creates the default category', async () => {
    let deleteConfirm = await categories.listCategories(categoryData);
    expect(deleteConfirm.response.categories).to.have.lengthOf(2);
  });

  after(async () => {
    categoryData.tribeCategory = categoryData.tribeCategoryOld;
    await identity.deleteIdentityById(categoryData);
    await organization.deleteOrganizationById(categoryData);
    await spaces.deleteSpaceByOrgIdAndSpaceId(categoryData);
    await categories.deleteCategory(categoryData);
  });
});
