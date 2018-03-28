# qa-automation

Test Automation Framework built in Javascript for testing all three layers of Appcurator :

* Front End (UI)
* Orca (Orchestration)
* Back End (Microservices/API)
#


### More Details

### Front End
Front End tests use the [WebdriverIO](http://webdriver.io/) library. This library is a [Webdriver](https://w3c.github.io/webdriver/webdriver-spec.html) (browser automation) module for [Node.JS](https://nodejs.org/en/). It makes possible to write super easy [Selenium](https://en.wikipedia.org/wiki/Selenium_(software)) tests in [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) test framework.

Tests are written and executed using [Mocha](https://mochajs.org/) and 
assertions are handled using [Chai](http://www.chaijs.com/)

### Orca and Back End
Orca and BackEnd API endpoints Integration tests are written using [Chakram](http://dareid.github.io/chakram/). 

Chakram is an API testing framework designed to perform end to end tests on JSON REST endpoints.

The library offers a BDD testing style and fully exploits javascript promises - the resulting tests are simple, clear and expressive. Chakram is built on [node.js](https://nodejs.org/), [mocha](http://mochajs.org/), [chai](http://chaijs.com/) and [request](https://github.com/request/request).

#

### Getting Started

#### Pre-Req
Java (JDK 1.8 or above) needs to be installed before downloading or running this repo

#### Installation
`master` always contains the latest code from all three layers

`
git checkout master
`

update *config.yml* with the URLs that you want to run tests against


Install dependencies

`
npm install 
`

Run Front End Tests

`
npm run start
`

Run Orca Tests

`
npm run orca
`

Run API Tests

`
npm run api
`





