import * as lib from '../../common';

const PROTO_PATH = lib.path.resolve(process.env.PROTO_DIR + 'segmentService.proto');
const LOCALHOST = process.env.LOCALHOST; // Use localhost while cluster is not available

const client = lib.caller(LOCALHOST, PROTO_PATH, 'SegmentService');

const category = new Object();

function createCategory(responseData) {
  category.orgId = responseData[1].id;
  category.spaceId = responseData[2].id;
  category.label = lib.randomString.generate(8);

  return client.createCategory({ 
    spaceContext: { 
      orgId: category.orgId, 
      spaceId: category.spaceId 
    }, 
    label: category.label 
  });
}

// source refers to a category object, as above
function listCategories(source) {
  return client.listCategories({
    spaceContext: { 
      orgId: source.orgId, 
      spaceId: source.spaceId 
    }
  });
}

export {
  createCategory,
  listCategories,
  category
};