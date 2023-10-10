const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    reporter: "reporter/custom-reporter.js",
    reporterOptions: {
      reportDir: "cypress/reports-custom",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  viewportWidth: 1280,
});
