var chakram = require('chakram'),
    expect = chakram.expect

const baseURL = 'http://localhost:3000/membership'
const org_id = 'b60c139e-6zz6-4s59-b6s8-z49dc781b3e1'

const url = baseURL + '/' + org_id

describe('PUT /membership', () => {

    var putData = {

        firstName: "JonAegon",
        lastName: "Targaryen"
    }

    var request = chakram.put(baseURL, putData)

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
