import { joi } from '../common';
import { registerAndCreateOrg, login } from 'actions/common';
import { getOrganizations } from 'actions/organization';
import { createSpace } from 'actions/space';
import { createTribe, updateTribe, deleteTribe, getTribe } from 'actions/tribe';
import { createTribeSchema, updateTribeSchema } from 'data/tribeSchema'
var tribeObject = new Object();
var createTribeResponse, updateTribeResponse, deleteTribeResponse, getTribeResponse;

describe('Tribe Tests', () => {
    before(async () => {
        await registerAndCreateOrg(tribeObject);
        await login(tribeObject);
        await getOrganizations(tribeObject);
        await createSpace(tribeObject);
        createTribeResponse = await createTribe(tribeObject);
    });
    it('Mutation- Create tribe', async () => {
        expect(createTribeResponse.response.statusCode).to.equal(200);
        joi.assert(createTribeResponse.response.body.data.createSegment, createTribeSchema(null));
    });

    it('Mutation- Update tribe', async () => {
        updateTribeResponse = await updateTribe(tribeObject);
        expect(updateTribeResponse.response.statusCode).to.equal(200);
        joi.assert(updateTribeResponse.response.body.data.updateSegment, updateTribeSchema(tribeObject.tribeNewName));
    });

    it('Mutation- Get tribe', async () => {
        getTribeResponse = await getTribe(tribeObject);
        expect(getTribeResponse.response.statusCode).to.equal(200);
        joi.assert(getTribeResponse.response.body.data, updateTribeSchema(tribeObject.tribeNewName));
    });

    it('Mutation- Delete tribe', async () => {
        deleteTribeResponse = await deleteTribe(tribeObject);
        expect(deleteTribeResponse.response.statusCode).to.equal(200);
        expect(deleteTribeResponse.response.body.data.deleteSegment.segmentId).to.equal(tribeObject.tribeID);
    });
});