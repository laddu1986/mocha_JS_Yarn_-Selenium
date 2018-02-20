
var chakram = require('chakram'),
    expect = chakram.expect

const baseURL = 'http://localhost:3000/membership'

describe('GET /membership', () => {

    var response = chakram.get(baseURL)

    it('Should have Response code 200', function () {
        expect(response).to.have.status(200);
        return chakram.wait()
    })

    it('Should have required JSON schema', function () {
        expect(response).to.have.schema(response[0], {
            "required": [
                "id",
                "name",
                "createdByUserId",
                "rowVersion",
                "createdTime",
                "modifiedTime"
            ]
        })
        return chakram.wait()
    })

    it('Should have JSON Content', function () {
        expect(response).to.have.header('content-type', 'application/json; charset=utf-8');
        return chakram.wait();
    })

    it('Should have GZIP Encoding', function () {
        expect(response).to.be.encoded.with.gzip
        return chakram.wait()
    })

    it('Should have valid data in JSON response', function () {
        expect(response).to.comprise.of.json(
            [{
                id: "b60c139e-6zz6-4s59-b6s8-z49dc781b3e1",
                identityId: "6285c16f-dfbd-474d-ae5e-7e19551133e1",
                firstName: "Jon",
                lastName: "Snow",
                organizationId: "6fd8523c-f438-4677-9827-15833f91ddfe",
                organizationName: "NightsWatch Brothers Inc"
            }]
        )
        return chakram.wait()
    })

    it('Should have response time less than 100ms', function () {
        var request = chakram.get(baseURL)
        expect(request).to.have.responsetime(100)
        return chakram.wait()
    })

})
