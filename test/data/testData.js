import * as lib from "../common";

const createAccountData = [
  {
    name: " ",
    email: " ",
    organization: " ",
    password: " ",
    title: "Adding empty data",
    expected: false
  },
  {
    name: lib.randomString(76),
    email: "a@a",
    organization: lib.randomString(76),
    password: "Passwor",
    title: "Checking email format",
    expected: false
  },
  {
    name: lib.randomString(76),
    email: "~!#$%^&*_+@massive.co",
    organization: lib.randomString(76),
    password: "M",
    title: "Checking password length with single character",
    expected: false
  },
  {
    name: lib.randomString(76),
    email: "~!#$%^&*_+@massive.co",
    organization: lib.randomString(76),
    password: "Massive",
    title: "Checking password length with 7 characters",
    expected: false
  },
  {
    name: lib.randomString(76),
    email: "~!#$%^&*_+@massive.co",
    organization: lib.randomString(76),
    password: "bigNam",
    title: "Checking with 201 characters",
    expected: false
  },
  {
    name: "~!@#$%^&*()_+",
    email: "~!#$%^&*_+@massive.co",
    organization: "~!@#$%^&*()_+",
    password: "!@#$%^&*()_+",
    title: "Adding all special characters",
    expected: false
  },
  {
    name: lib.randomString(10),
    email: lib.randomString(15) + `@test.co`,
    organization: lib.randomString(14),
    password: process.env.ACCOUNT_PASS,
    title: "Adding all valid details",
    expected: true
  }
];

const createOrganizationData = [
  {
    name: " ",
    title: "Adding empty data",
    expected: false
  },
  {
    organization: lib.randomString(76),
    title: "Checking password length with 76 characters",
    expected: false
  },
  {
    organization: "~!@#$ %^&*()_+",
    title: "Adding all special characters",
    expected: false
  },
  {
    organization: lib.randomString(75),
    title: "Adding all valid details",
    expected: true
  }
];

export { createOrganizationData, createAccountData };
