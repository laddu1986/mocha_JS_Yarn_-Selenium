import axios from 'axios'
import faker from 'faker'

describe('organization service', () => {
  test('getOrganizationById', async () => {
    const response = await axios.post('http://localhost:3001/', {
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

    const { data } = response;

    expect(data).toMatchObject({
      "data": {
        "getOrganization": {
          "id": "08d57439-b12f-4e40-6f6d-9c469998d446",
          "name": "Massive",
          "createdByUserId": "486ac881-5901-4997-825e-19eac39d0451"
        }
      }
    })
  })

  test('createAccount', async () => {

    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = 'Password@1234'
    const organizationName = faker.company.companyName()

    const response = await axios.post('http://localhost:3001/', {
      query: `
        mutation {
          createAccount(input: {fields:
            ${console.log(name + '\n' + email + '\n' + password + '\n' + organizationName)}
            {name: ${name} , email: ${email}, password: ${password}, organizationName: ${organizationName}}}) {
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

    //console.log(query)


    // const response = await axios({
    //   method: 'post',
    //   url: 'http://localhost:3001/',
    //   data: {}
    // })

    const { data } = response

    expect(data).toMatchObject({
      "data": {
        "createAccount": {
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
    })
  })
})

