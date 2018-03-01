var chakram = require('chakram'),
    expect = chakram.expect
const config = require('config-yml')
const baseURL = config.api.identities

var faker = require('faker')
const fullname = faker.name.findName()
const email = faker.internet.email()
const password = faker.internet.password()

describe('POST /identities', () => {
    const postIdentityRequestURL = baseURL + 'api/v1/identities'
    console.log(postIdentityRequestURL);

    var postData = {
        "fullName": fullname,
        "email": email,
        "password": password
    }

    it('should validate all the HTTP responses of POST Identities', function () {
        const response = chakram.post(postIdentityRequestURL, postData)
        return chakram.wait([
            expect(response).to.have.status(201),
            expect(response).not.to.have.status(400),
            expect(response).not.to.have.status(500),
            expect(response).to.have.header('content-type', 'application/json; charset=utf-8'),
            expect(response).to.comprise.of.json({
                "fullName": fullname,
                "email": email
            })
        ])
    })
})

describe('GET /identities', () => {
    const getOrgRequestURL = baseURL + 'api/v1/identities'

    it('should validate all the HTTP responses of GET Identities', function () {
        const response = chakram.get(getOrgRequestURL)
        return chakram.wait([
            expect(response).to.have.status(200),
            expect(response).not.to.have.status(404),
            expect(response).to.have.header('content-type', 'application/json; charset=utf-8'),
            expect(response).to.comprise.of.json([{
                "fullname": fullname,
                "email": email
            }])
        ])
    })
})

describe('GET /identities{id}', () => {
    const getIdentitiesByOrgByRequestURL = baseURL + 'api/v1/identities/' //+ organizationId

    it('should validate all the HTTP responses of GET Membership by id', function () {
        const response = chakram.get(getIdentitiesByOrgByRequestURL)
        return chakram.wait([
            expect(response).to.have.status(200),
            expect(response).not.to.have.status(404),
            expect(response).to.have.header('content-type', 'application/json; charset=utf-8'),
            expect(response).to.comprise.of.json([{
                "fullname": fullname,
                "email": email
            }])
        ])
    })
})