//import axios from 'axios'
//import faker from 'faker'
import { chakram, faker } from '../common';

var name = faker.name.findName()
var email = faker.internet.email()
var password = 'Password@1234'
var organizationName = faker.company.companyName()

describe('Orca Query Tests', function () {

  it('getOrganization + Should GET an Organization with valid Id', function () {

    var request = chakram.post('https://api.appcurator.com/', {
      query: `
        query{
          getOrganization(id: "08d57439-b12f-4e40-6f6d-9c469998d446") {
            id
            name
            createdByUserId
          }
        }
      `,
    })

    var response = {
      "data": {
        "getOrganization": {
          "id": "08d57439-b12f-4e40-6f6d-9c469998d446",
          "name": "Massive",
          "createdByUserId": "486ac881-5901-4997-825e-19eac39d0451"
        }
      }
    }

    expect(request).to.have.json(response)

    return chakram.wait()
  })

  it('getOrganization - Should throw Errors when invalid Org Id is entered to GET Org Details', function () {
    var request = chakram.post('https://api.appcurator.com/', {
      query: `
        query{
          getOrganization(id:"max"){
            id
            name
            createdByUserId
            rowVersion
          }
        }
      `
    })

    return chakram.waitFor([
      expect(request).to.have.status(200), //Response from ORCA is always 200
      expect(request).to.have.json('errors[0].message', 'Request failed with status code 404'),
      expect(request).to.have.json('errors[0].status', 404), //Response from Microservice
      expect(request).to.have.json('errors[0].type', 'ServiceError')
    ])
  })

  it('getAccount + Should GET an Account by valid Id', function () {

    var request = chakram.post('https://api.appcurator.com/', {
      query: `
        query{
          getAccount(id:"0a3b31ae-4dbf-42bb-9dc8-6b79b7d40f1b"){
            name
            email
            organizations {
              id
              name
            }
          }
        }
      `
    })

    return chakram.waitFor([
      expect(request).to.have.status(200),//Response from Orca
      expect(request).to.have.json('data.getAccount.name', 'Paul'),
      expect(request).to.have.json('data.getAccount.email', 'jonwick13ab@max.co'),
      expect(request).to.have.json('data.getAccount.organizations[0].id', '08d589af-1572-0648-aaa0-2427e3b1903a'),
      expect(request).to.have.json('data.getAccount.organizations[0].name', 'Mass Update')
    ])

  })

  it('getAccount - Should throw Errors when Getting an Account by invalid Id', function () {

    var request = chakram.post('https://api.appcurator.com/', {
      query: `
        query{
          getAccount(id:"invalid-id"){
            name
            email
            organizations {
              id
              name
            }
          }
        }
      `
    })

    return chakram.waitFor([
      expect(request).to.have.status(200), //Response from Orca
      expect(request).to.have.json('errors[0].status', 404), //Response from Microservice
      expect(request).to.have.json('errors[0].type', 'ServiceError'),
      expect(request).to.have.json('errors[0].message', 'User with Id invalid-id not found'),
    ])

  })

})
