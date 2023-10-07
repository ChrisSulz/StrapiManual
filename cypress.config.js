const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // baseUrl: "http://localhost:1337",

    // reporter: "mochawesome",
    // reporterOptions: {
    //   reportDir: "cypress/reports",
    //   overwrite: false,
    //   html: false,
    //   json: true,
    // },

    reporter: "reporter/custom-reporter.js",
    reporterOptions: {
      reportDir: "cypress/reports-custom",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
