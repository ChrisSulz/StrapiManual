const fs = require("fs");
const path = require("path");

class CustomReporter {
  constructor(runner, options) {
    this.outputDir =
      (options.reporterOptions && options.reporterOptions.reportDir) ||
      "cypress/custom-reports";
    this.testResults = [];

    runner.on("suite", (suite) => {
      this.currentTest = {
        describe: suite.title,
        steps: [],
      };
    });

    runner.on("test", (test) => {
      const step = {
        title: test.title,
        commands: [],
      };
      if (test.body) {
        step.commands = this.extractCypressCommands(test.body);
      }
      this.currentTest.steps.push(step);
    });

    runner.on("end", () => {
      this.testResults.push(this.currentTest);
      const htmlContent = this.generateHTML();
      const outputPath = path.resolve(this.outputDir, "report.html");
      fs.writeFileSync(outputPath, htmlContent);
    });
  }

  extractCypressCommands(testBody) {
    const cypressCommands = [];
    const bodyLines = testBody.split("\n");
    bodyLines.forEach((line) => {
      if (line.includes("cy.") && !line.includes("cy.screenshot")) {
        cypressCommands.push(line.trim());
      }
    });
    return cypressCommands;
  }

  generateHTML() {
    const formattedResults = this.testResults.map((test) => {
      let resultHTML = `<h1>${test.describe}</h1>\n`;

      test.steps.forEach((step) => {
        resultHTML += `<h2>${step.title}</h2>\n`;
        step.commands.forEach((command) => {
          resultHTML += `<p>${command}</p>\n`;
        });
      });

      return resultHTML;
    });

    return `<html>\n<head>\n<title>Cypress Custom Report</title>\n</head>\n<body>\n${formattedResults.join(
      "\n"
    )}</body>\n</html>`;
  }
}

module.exports = CustomReporter;
