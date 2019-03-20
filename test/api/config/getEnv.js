require('dotenv').config();

var vars,
  envArg,
  identities,
  organizations,
  memberships,
  spaces,
  token,
  invites,
  keys,
  metrics,
  experience,
  tribe,
  user;

function namespace() {
  process.argv.forEach(function(value) {
    if (/--.+:/.test(value)) {
      vars = value.split(':');
      if (vars[0] == '--env') envArg = vars[1];
    }
  });

  if (envArg == '' || envArg === undefined) {
    getEndPointsFor('DEV');
  } else {
    switch (envArg.toLowerCase()) {
      case 'qa':
        getEndPointsFor('QA');
        break;
      case 'dev':
        getEndPointsFor('DEV');
        break;
      case 'prod':
        getEndPointsFor('PROD');
        break;
      default:
        getEndPointsFor('DEV');
    }
  }
}

function getEndPointsFor(ENV) {
  identities = process.env[`API_IDENTITIES_${ENV}`];
  organizations = process.env[`API_ORGANIZATIONS_${ENV}`];
  memberships = process.env[`API_MEMBERSHIPS_${ENV}`];
  spaces = process.env[`API_SPACES_${ENV}`];
  token = process.env[`API_TOKEN_${ENV}`];
  invites = process.env[`API_INVITES_${ENV}`];
  keys = process.env[`API_KEYS_${ENV}`];
  metrics = process.env[`API_METRICS_${ENV}`];
  experience = process.env[`GRPC_EXPERIENCE_${ENV}`];
  user = process.env[`GRPC_USER_${ENV}`];
  tribe = process.env[`GRPC_TRIBE_${ENV}`];
}

namespace();

export {
  identities,
  organizations,
  memberships,
  spaces,
  token,
  invites,
  keys,
  metrics,
  expect,
  experience,
  tribe,
  user
};
