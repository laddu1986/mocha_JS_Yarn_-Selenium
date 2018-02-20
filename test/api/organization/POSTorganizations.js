var chakram = require('chakram'),
    expect = chakram.expect

const baseURL = 'http://localhost:3000/organizations'

describe('POST /organizations', () => {

    var postData = {
        id: "b60c139e-6zz6-4s59-b6s8-z49dc781b3e1",
        identityId: "6285c16f-dfbd-474d-ae5e-7e19551133e1",
        firstName: "Jon",
        lastName: "Snow",
        organizationId: "6fd8523c-f438-4677-9827-15833f91ddfe",
        organizationName: "NightsWatch Brothers Inc"
    }

    var request = chakram.post(baseURL, postData)

    it('Should have Response code 201', function () {
        return chakram.expect(request).to.have.status(201)
    })

    it('Should have response time less than 100ms', function () {
        var request = chakram.get(baseURL)
        expect(request).to.have.responsetime(100)
        return chakram.wait()
    })

    it('Should not have Response code 400', function () {
        return chakram.expect(request).not.to.have.status(400)
    })

})
