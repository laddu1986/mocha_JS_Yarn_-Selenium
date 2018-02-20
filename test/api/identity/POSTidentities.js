var chakram = require('chakram'),
    expect = chakram.expect

const baseURL = 'http://localhost:3000/identities'

describe('POST /identities', () => {

    var postData = {
        id: "a1bc23de-4f5g-67hi-jk8l-9m0no12p3456",
        fullname: "Sansa Stark",
        email: "LadyOfWinterfell@North.com"
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
