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
  metrics;

function namespace() {
  process.argv.forEach(function (value) {
    if (/--.+\:/.test(value)) {
      vars = value.split(':');
      if (vars[0] == '--env') envArg = vars[1];
    }
  });

  if (envArg == '' || envArg === undefined) {
    identities = process.env.API_IDENTITIES_DEV
    memberships = process.env.API_MEMBERSHIPS_DEV
    organizations = process.env.API_ORGANIZATIONS_DEV
    spaces = process.env.API_SPACES_DEV
    token = process.env.API_TOKEN_DEV
    invites = process.env.API_INVITES_DEV
    keys = process.env.API_KEYS_DEV
    metrics = process.env.API_METRICS_DEV
  }
  else {
    switch (envArg) {
      case 'qa': case 'QA': case 'Qa':
        identities = process.env.API_IDENTITIES_QA
        memberships = process.env.API_MEMBERSHIPS_QA
        organizations = process.env.API_ORGANIZATIONS_QA
        spaces = process.env.API_SPACES_QA
        token = process.env.API_TOKEN_QA
        invites = process.env.API_INVITES_QA
        keys = process.env.API_KEYS_QA
        metrics = process.env.API_METRICS_QA
        break;
      case 'dev': case 'DEV': case 'Dev':
        identities = process.env.API_IDENTITIES_DEV
        memberships = process.env.API_MEMBERSHIPS_DEV
        organizations = process.env.API_ORGANIZATIONS_DEV
        spaces = process.env.API_SPACES_DEV
        token = process.env.API_TOKEN_DEV
        invites = process.env.API_INVITES_DEV
        keys = process.env.API_KEYS_DEV
        metrics = process.env.API_METRICS_DEV
        break;
      case 'prod': case 'PROD': case 'Prod':
        identities = process.env.API_IDENTITIES_DEV
        memberships = process.env.API_MEMBERSHIPS_DEV
        organizations = process.env.API_ORGANIZATIONS_DEV
        spaces = process.env.API_SPACES_DEV
        token = process.env.API_TOKEN_DEV
        invites = process.env.API_INVITES_DEV
        keys = process.env.API_KEYS_DEV
        metrics = process.env.API_METRICS_DEV
        break;
      default:
        identities = process.env.API_IDENTITIES_DEV
        memberships = process.env.API_MEMBERSHIPS_DEV
        organizations = process.env.API_ORGANIZATIONS_DEV
        spaces = process.env.API_SPACES_DEV
        token = process.env.API_TOKEN_DEV
        invites = process.env.API_INVITES_DEV
        keys = process.env.API_KEYS_DEV
        metrics = process.env.API_METRICS_DEV
    }
  }

  return envArg,
    identities,
    organizations,
    memberships,
    spaces,
    token,
    invites,
    keys,
    metrics;
}

namespace()

export {
  identities,
  organizations,
  memberships,
  spaces,
  token,
  invites,
  keys,
  metrics
}