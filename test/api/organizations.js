//import chakram from '../../../node_modules/chakram/lib/chakram'
import faker from '../../node_modules/faker/'
var chakram = require('chakram'),
    expect = chakram.expect
const config = require('config-yml')
const baseURL = config.api.organizations

//var faker = require('faker')
const companyName = faker.company.companyName()
const uuid = faker.random.uuid()

describe('POST /organizations', () => {
    const postOrgRequestURL = baseURL + 'api/v1/organizations'
    var postData = {
        "name": companyName,
        "id": uuid
    }



    it('should validate all the HTTP responses of POST Organizations', function () {
        const response = chakram.post(postOrgRequestURL, postData)
        return chakram.wait([
            expect(response).to.have.status(201),
            expect(response).not.to.have.status(400),
            expect(response).not.to.have.status(500),
            expect(response).to.have.header('content-type', 'application/json; charset=utf-8'),
            expect(response).to.comprise.of.json({
                "name": companyName,
                "id": uuid
            })
        ])
    })
})

describe('GET /organizations', () => {
    const getOrgRequestURL = baseURL + 'api/v1/organizations'
    // var response;
    // before(function () {
    //     response = chakram.get(getOrgRequestURL);
    // })

    it('should validate all the HTTP responses of GET Organizations', function () {
        const response = chakram.get(getOrgRequestURL)
        return chakram.wait([
            expect(response).to.have.status(200),
            expect(response).not.to.have.status(404),
            expect(response).to.have.header('content-type', 'application/json; charset=utf-8'),
            expect(response).to.comprise.of.json([{
                "name": companyName,
                "id": uuid
            }])
        ])
    })
})

describe('GET /organizations/{id}', () => {
    const getOrgByIdRequestURL = baseURL + 'api/v1/organizations/' + uuid

    it('should validate all the HTTP responses of GET Organizations by id', function () {
        const response = chakram.get(getOrgByIdRequestURL)
        return chakram.wait([
            expect(response).to.have.status(200),
            expect(response).not.to.have.status(404),
            expect(response).to.have.header('content-type', 'application/json; charset=utf-8'),
            expect(response).to.comprise.of.json({
                "name": companyName,
                "id": uuid
            })
        ])
    })
})



