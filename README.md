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

###Reporting
Currently the html reports are being generated for API(mocha) tests using "mocha-simple-html-reporter" and for UI(wdio) tests using "wdio-html-format-reporter".
"pngjs" module is also needed.
The reports will by default be saved in : .test/api/Reports and .test/web/Reports with names : wdio-report.html and api-report.html

### Getting Started

#### Pre-Req
[Java Development Kit 1.8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) or higher


#### Installation
`master` always contains the latest stable code

`
git checkout master
`

Install dependencies
`
npm install -g yarn
`

`
yarn install
`

create a `.env` file in the root of this repo and add the values for the keys mentioned in `.env-sample`


Run Front End Tests

`
yarn run web
`

The following arguments can be appended to the above to run tests in different combinations of browsers and environments:

`--browser:firefox` (default is `chrome`), other accepted values are  `chrome`, `chrome_headless`, `firefox`, `safari`, `ie`



`--env:dev` (to run the tests in dev environment, default is `qa`), other accepted options are for `--env:` are `qa`, `squad`


`--suite <foldername>`  for executing tests from a particular folder instead of the whole suite

For executing web smoke tests only: `yarn run web-smoke-tests`


Run API Tests

`
yarn run api
`

For executing api smoke tests: `yarn run api-smoke-tests`
#

###  Help !
For any queries contact [Balpreet](balpreet.kaur@massive.co) or [Abhi](abhijeet.daspatnaik@massive.co) or [Paul](paul.sanchez@massive.co)
