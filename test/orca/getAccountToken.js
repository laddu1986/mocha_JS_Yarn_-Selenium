//import { chakram, faker, config } from '../common';
import { chakram, config } from '../common';


// const emoji = require('node-emoji');

const email = config.orca.email;
const password = config.orca.password;
const remember = config.orca.remember;


const url = 'https://api.appcurator.com/';
let cookies;
describe('Authenticate User', () => {

  it('Get Cookie', () => {
    const response = chakram.post(url, {
      query: `
        mutation {
          login(input: {fields: {email: "${email}", password: "${password}", remember: ${remember}}})
        }
      `
    });
    return chakram.waitFor([
      expect(response).to.have.status(200),
      expect(response).to.have.json('data.login', true),
      expect(response).to.have.cookie('acid'),
      expect(response).to.have.cookie('acsi')
    ]).then((responsebody) => {
      // [ 'name=whatever', 'other=foo' ]
      cookies = (responsebody.response.headers['set-cookie'].map(v => v.split(';')[0])).join('; ');
      // console.log(responsebody.response.body)
      return responsebody;
    }).then((getAccDetails) => {
      const options = {
        headers: {
          cookie: cookies
        }
      };

      //const response = chakram.post(url, {
      chakram.post(url, {
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
        .then((resBody) => {
          //console.log(resBody.response.body.data.getAccount);
          // console.log(JSON.stringify(resBody.response.body))
          return resBody;
        });
      //console.log(`Cookie Ready ${emoji.get(':cookie:')}`);
      //console.log(`COO 1${cookies}`);
      return getAccDetails, cookies;
    });
    // console.log(`COO 2${cookies}`);
  });
});

// export default new Cookies();
