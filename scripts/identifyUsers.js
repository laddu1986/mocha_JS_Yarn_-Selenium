var chakram = require('/Users/abhi/Documents/qa-automaton/node_modules/chakram/lib/methods.js')
const users = require('./spaceUsers.json');
const agents = require('./user-agents.json');
const faker = require('')

const apiKey = 'cda8204f-a06e-4288-a015-6f81a9382061';
const identifyUrl = `https://client.appcurator.io/identify?api_key=${apiKey}`;

var requestHeaders = {
  "Host": "client.appcurator.io",
  //"User-Agent": assigned in the function below
  "Accept": "application/json",
  "Accept-Language": "en-US,en;q=0.5",
  "Accept-Encoding": "gzip, deflate, br",
  "Referer": "https://dev.demospace.org/",
  "content-type": "application/x-www-form-urlencoded; charset=utf-8",
  "origin": "https://dev.demospace.org"
}

async function renewUsers() {
  let usrLength = users.length;
  let agentLength = agents.length;

  var i = 5


  while (i--) {
    const j = getRandomInt(usrLength)
    const user = users.splice(j, 1)[0]

    var requestBody = {
      "userId": `${user.userId}`,
      "displayName": `${user.displayName}`,
      "email": `${user.email}`,
    }

    const k = getRandomInt(agentLength)
    const agent = agents[k]
    Object.assign(requestHeaders, { "User-Agent": `${agent.agent}` })

    var response = await chakram.post(identifyUrl, requestBody, requestHeaders)
    await response

    console.log(response.body)

  }

}

function getRandomInt(int) {
  return Math.floor(Math.random() * Math.floor(int))
}


renewUsers()
