var chakram = require('chakram'),
    expect = chakram.expect
const config = require('config-yml')
const baseURL = config.api.memberships

var faker = require('faker')
const identityId = faker.random.uuid()
const organizationId = faker.random.uuid()

describe('POST /memberships', () => {
    const postMembershipRequestURL = baseURL + 'api/memberships'
    console.log(postMembershipRequestURL);

    var postData = {
        "identityId": identityId,
        "organizationId": organizationId
    }

    it('should validate all the HTTP responses of POST Memberships', function () {
        const response = chakram.post(postMembershipRequestURL, postData)
        return chakram.wait([
            expect(response).to.have.status(201),
            expect(response).not.to.have.status(400),
            expect(response).not.to.have.status(500),
            expect(response).to.have.header('content-type', 'application/json; charset=utf-8'),
            expect(response).to.comprise.of.json({
                "identityId": identityId,
                "organizationId": organizationId
            })
        ])
    })
})

describe('GET /memberships', () => {
    const getOrgRequestURL = baseURL + 'api/memberships'

    it('should validate all the HTTP responses of GET Memberships', function () {
        const response = chakram.get(getOrgRequestURL)
        return chakram.wait([
            expect(response).to.have.status(200),
            expect(response).not.to.have.status(404),
            expect(response).to.have.header('content-type', 'application/json; charset=utf-8'),
            expect(response).to.comprise.of.json([{
                "identityId": identityId,
                "organizationId": organizationId
            }])
        ])
    })
})

describe('GET /memberships/organization{id}', () => {
    const getMembershipByOrgByRequestURL = baseURL + 'api/memberships/organization/' + organizationId

    it('should validate all the HTTP responses of GET Membership by id', function () {
        const response = chakram.get(getMembershipByOrgByRequestURL)
        return chakram.wait([
            expect(response).to.have.status(200),
            expect(response).not.to.have.status(404),
            expect(response).to.have.header('content-type', 'application/json; charset=utf-8'),
            expect(response).to.comprise.of.json([{
                "identityId": identityId,
                "organizationId": organizationId
            }])
        ])
    })
})