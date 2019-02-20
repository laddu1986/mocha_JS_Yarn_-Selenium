exports.config = {
  testRailsOptions: {
    domain: process.env.TESTRAIL_URL,
    username: process.env.TESTRAIL_USERNAME,
    password: process.env.TESTRAIL_PASSWORD,
    projectId: process.env.TESTRAIL_PROJECT,
    suiteId: process.env.TESTRAIL_ORCA,
    runName: 'Orca Test Run'
  }
};
