# qa-automation

Test Automation Framework built in Javascript for testing all three layers of Appcurator :

- Front End (UI)
- Orca (Orchestration)
- Back End (Microservices/API)

#

## More Details

### Front End

Front End tests use the [WebdriverIO](http://webdriver.io/) library. This library is a [Webdriver](https://w3c.github.io/webdriver/webdriver-spec.html) (browser automation) module for [Node.JS](https://nodejs.org/en/). It makes possible to write super easy [Selenium](<https://en.wikipedia.org/wiki/Selenium_(software)>) tests in [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) test framework.

Tests are written and executed using [Mocha](https://mochajs.org/) and
assertions are handled using [Chai](http://www.chaijs.com/)

### Orca and Back End

Orca and BackEnd API endpoints Integration tests are written using [Chakram](http://dareid.github.io/chakram/).

Chakram is an API testing framework designed to perform end to end tests on JSON REST endpoints.

The library offers a BDD testing style and fully exploits javascript promises - the resulting tests are simple, clear and expressive. Chakram is built on [node.js](https://nodejs.org/), [mocha](http://mochajs.org/), [chai](http://chaijs.com/) and [request](https://github.com/request/request).

### Getting Started

#### Pre-Req

[Java Development Kit 1.8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) or higher

#### Installation

`master` always contains the latest stable code

`git checkout master`

##### Install dependencies

`npm install -g yarn`

and to install dependencies for Orca, Web and Api tests you can use

`yarn run dev`

##### dotenv

Locally we use dotenv for define our environment variables.
Create a `.env` file in the root of this repo and add the values for the keys mentioned in `.env-sample`

##### Run Front End Tests

`yarn run web-local`

NB: You must have selenium running before you can execute the tests locally. We suggest using [Selenium Standalone](https://github.com/vvo/selenium-standalone)

The following arguments can be appended to the above to run tests in different combinations of browsers and environments:

`--browser:firefox` (default is `chrome`), other accepted values are `chrome`, `chrome_headless`, `firefox`, `safari`, `ie`

`--env:dev` (to run the tests in dev environment, default is `qa`), other accepted options are for `--env:` are `qa`, `squad`

`--suite <foldername>` for executing tests from a particular folder instead of the whole suite

##### Run API and Orca Tests

`yarn run api-local`

`yarn run orca-local`

##### Reporting
When running locally, html reports are being generated for API/Orca(mocha) tests using `mocha-simple-html-reporter` and for UI(wdio) tests using `wdio-html-format-reporter`.
The reports will by default be saved in`.test/[api/orca/web]/Reports`

When reporting to TestRail, we use `yarn run [api/web/orca]`. Doing this requires tests to synchronised. To ensure all tests are synchronised, run `yarn run sync-tests`

##### Debugging

If you use vscode, heres some debugger configurations you can use out of the box

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "API Debug",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "yarn",
      "args": ["run", "api-debug"],
      "protocol": "inspector",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "port": 5858
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Web Debug",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "yarn",
      "args": [
        "run",
        "web-debug",
        "--browser:chrome"
      ],
      "protocol": "inspector",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "port": 5858
    }
  ]
}
```

### Help !

For any queries contact [Balpreet](balpreet.kaur@massive.co) or [Abhi](abhijeet.daspatnaik@massive.co) or [Paul](paul.sanchez@massive.co)
