import { chakram, faker, config } from '../common';


var emoji = require('node-emoji')
var email = config.orca.email
var password = config.orca.password
var remember = config.orca.remember

console.log(email, password)

var url = 'https://api.appcurator.com/'
var cookies
describe('Authenticate User', function () {

  it('Get Cookie', function () {
    var response = chakram.post(url, {
      query: `
        mutation {
          login(input: {fields: {email: "${email}", password: "${password}", remember: ${remember}}})
        }
      `
    })
    return chakram.waitFor([
      expect(response).to.have.status(200),
      expect(response).to.have.json('data.login', true),
      expect(response).to.have.cookie('acid'),
      expect(response).to.have.cookie('acsi')
    ]).then(function (responsebody) {
      // [ 'name=whatever', 'other=foo' ]
      cookies = (responsebody.response.headers['set-cookie'].map(v => v.split(';')[0])).join('; ');
      //console.log(responsebody.response.body)
      return responsebody
    }).then(function (getAccDetails) {
      var options = {
        headers: {
          "cookie": cookies
        }
      }

      let response = chakram.post(url, {
        query: `query{getAccount{id
                name
                email
                organizations {
                  id
                }
              }
            }
            `
      }, options)
        .then(function (resBody) {
          console.log(resBody.response.body.data.getAccount)
          //console.log(JSON.stringify(resBody.response.body))
          return resBody
        })
      console.log('Cookie Ready ' + emoji.get(':cookie:'))
      console.log('COO 1' + cookies)
      return getAccDetails, cookies
    })
    console.log('COO 2' + cookies)
  })
})

//export default new Cookies();
