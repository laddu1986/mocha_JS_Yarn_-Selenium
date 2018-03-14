import { chakram, faker } from '../common';

var name = faker.name.findName()
var email = faker.internet.email()
var password = 'Password@1234'
var organizationName = faker.company.companyName()

describe('Orca Mutation Tests', function () {

  it('registerAndCreateOrg + Should Register and Create Account successfully with valid data', function () {

    var request = chakram.post('https://api.appcurator.com/', {
      query: `
        mutation {
          registerAndCreateOrg(input: {fields:
            {name: "${name}" , email: "${email}", password: "${password}", organizationName: "${organizationName}"}}) {
            account {
              name
              email
              organizations {
                name
              }
            }
          }
        }
      `
    })
      .then(function (responseBody) {
        //console.log('POST response is : ' + JSON.stringify(responseBody))
        expect(responseBody).to.have.status(200)
        return responseBody
      })

    var response = {
      "data": {
        "registerAndCreateOrg": {
          "account": {
            "name": name,
            "email": email,
            "organizations": [
              {
                "name": organizationName
              }
            ]
          }
        }
      }
    }

    expect(request).to.have.json(response)
    return chakram.wait()

  })


  it('registerAndCreateOrg - Should throw Errors when invalid Full name is entered while Registering new Org', function () {
    var request = chakram.post('https://api.appcurator.com/', {
      query: `
        mutation {
          registerAndCreateOrg(input: {fields:
            {name: " " , email: "email@massive.co", password: "Password@1234", organizationName: "Massive Co"}}) {
            account {
              name
              email
              organizations {
                name
              }
            }
          }
        }
      `
    })

    return chakram.waitFor([
      expect(request).to.have.status(200), //Response from ORCA is always 200
      expect(request).to.have.json('errors[0].message', 'The request is invalid.'),
      expect(request).to.have.json('errors[0].status', 400), //Response from Microservice
      expect(request).to.have.json('errors[0].type', 'ServiceError'),
      expect(request).to.have.json('errors[0].data.validationErrors.fullName',
        'Error:InvalidData, ErrorCode:4002, Message: Full name cannot be empty'
      )
    ])
  })

  it('registerAndCreateOrg - Should throw Errors when invalid Email is entered while Registering new Org', function () {
    var request = chakram.post('https://api.appcurator.com/', {
      query: `
        mutation {
          registerAndCreateOrg(input: {fields:
            {name: "Kane" , email: "abc", password: "Password@1234", organizationName: "Massive Co"}}) {
            account {
              name
              email
              organizations {
                name
              }
            }
          }
        }
      `
    })

    return chakram.waitFor([
      expect(request).to.have.status(200), //Response from ORCA is always 200
      expect(request).to.have.json('errors[0].message', 'The request is invalid.'),
      expect(request).to.have.json('errors[0].status', 400), //Response from Microservice
      expect(request).to.have.json('errors[0].type', 'ServiceError'),
      expect(request).to.have.json('errors[0].data.validationErrors.email',
        'Error:InvalidData, ErrorCode:4002, Message: Email address is invalid'
      )
    ])
  })

  it('registerAndJoinOrg + Should join an Existing Org with valid credentials', function () {

  })

  it('registerAndJoinOrg - Should throw errors when joining an Existing Org with invalid credentials', function () {

  })

  it('updateOrganization + Should successfully update an Org using valid Id', function () {

  })

  it('updateOrganization - Should throw Errors when updating an Org with invalid Id', function () {

  })



  it('login + Should Login with correct credentials', function () {
    var request = chakram.post('https://api.appcurator.com/', {
      query: `
        mutation {
          login(input: {fields: {email: "abhi@mass.co", password: "Pass@1234", remember: true}})
        }
      `
    })
    return chakram.waitFor([
      expect(request).to.have.status(200),
      expect(request).to.have.json('data.login', true)
    ])
  })

  it('login - Should throw Errors when Logging in with incorrect Credentials', function () {
    var request = chakram.post('https://api.appcurator.com/', {
      query: `
        mutation {
          login(input: {fields: {email: "abhi@mass.co", password: "wrongPassword", remember: true}})
        }
      `
    })
    return chakram.waitFor([
      expect(request).to.have.status(200),
      expect(request).to.have.json('errors[0].status', 400), //Response from Microservice
      expect(request).to.have.json('errors[0].type', 'ServiceError'),
      expect(request).to.have.json('errors[0].message', 'Request failed with status code 400'),
    ])
  })


  it('logout + Should return a proper Boolean value while Logging Out', function () {
    var request = chakram.post('https://api.appcurator.com/', {
      query: `
        mutation{logout}
      `
    })
    return chakram.waitFor([
      expect(request).to.have.status(200),
      expect(request).to.have.json('data.logout', true)
    ])
  })



})
