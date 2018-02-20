
var chakram = require('chakram'),
    expect = chakram.expect

const baseURL = 'http://localhost:3000/identities'
const identity_id = 'a1bc23de-4f5g-67hi-jk8l-9m0no12p3456'

const url = baseURL + '/' + identity_id

describe('GET /identities/{id}', () => {

    var response = chakram.get(url)

    it('Should have Response code 200', function () {
        expect(response).to.have.status(200);
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
            {
                id: "a1bc23de-4f5g-67hi-jk8l-9m0no12p3456",
                fullname: "Sansa Stark",
                email: "LadyOfWinterfell@North.com"
            }
        )
        return chakram.wait()
    })

    it('Should have response time less than 100ms', function () {
        var request = chakram.get(url)
        expect(request).to.have.responsetime(100)
        return chakram.wait()
    })

})
