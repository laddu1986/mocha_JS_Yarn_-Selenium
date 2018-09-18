import * as lib from '../../common';

const PROTO_PATH = lib.path.resolve(process.env.PROTO_DIR + 'segmentService.proto');
const LOCALHOST = process.env.TRIBE_HOST; // Use localhost while cluster is not available

const client = lib.caller(LOCALHOST, PROTO_PATH, 'SegmentService');

const category = new Object();

// map response data and relevant data into category to be accessed later
function createCategory(responseData) {
  category.orgId = responseData[1].id;
  category.spaceId = responseData[2].id;
  category.label = lib.randomString.generate(8);

  return client.createCategory({ 
    spaceContext: { orgId: category.orgId, spaceId: category.spaceId }, 
    label: category.label 
  }).then((response) => {
    category.createResponse = response;
    category.id = category.createResponse.id;
    return response;
  });
}

// source refers to a category object, as above
function listCategories(source) {
  return client.listCategories({
    spaceContext: { orgId: source.orgId, spaceId: source.spaceId }
  }).then((response) => {
    category.listResponse = response;
    return response;
  });
}

function renameCategory(source) {
  category.renamedLabel = lib.randomString.generate(7);
  return client.renameCategory({ 
    categoryContext: { orgId: source.orgId, spaceId: source.spaceId, categoryId: source.id }, 
    label: category.renamedLabel
  }).then((response) => {
    category.renameResponse = response;
    return response;
  });
}

function moveCategory(source) {
  return client.moveCategory({
    categoryContext: { orgId: source.orgId, spaceId: source.spaceId, categoryId: source.id }, 
    index: { value: 10 }
  }).then((response) => {
    category.moveResponse = response;
  });
}

function deleteCategory(source) {
  return client.deleteCategory({
    categoryContext: { orgId: source.orgId, spaceId: source.spaceId, categoryId: source.id }
  }).then((response) => {
    category.deleteRespnse = response;
    return response;
  });
}

export {
  createCategory,
  listCategories,
  renameCategory,
  moveCategory,
  deleteCategory,
  category
};