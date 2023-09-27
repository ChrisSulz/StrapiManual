const fs = require("fs");
const path = require("path");

class CustomReporter {
  constructor(runner, options) {
    this.outputDir =
      (options.reporterOptions && options.reporterOptions.reportDir) ||
      "cypress/custom-reports";
    this.testResults = [];

    // Event-Listener für Test-Suite "describe" --> currentTest
    runner.on("suite", (suite) => {
      this.currentTest = {
        describe: suite.title,
        steps: [],
      };
    });

    // Event-Listener für Test "it" --> step
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

    // Event-Listener für Testabschluss
    runner.on("end", () => {
      this.testResults.push(this.currentTest);
      const htmlContent = this.generateHTML();
      const outputPath = path.resolve(
        this.outputDir,
        `${this.currentTest.describe}.html`
      );
      fs.writeFileSync(outputPath, htmlContent);
    });
  }

  extractCypressCommands(testBody) {
    const cypressCommands = [];

    const regex = /cy\.[\s\S]*?;/g;

    let match;
    while ((match = regex.exec(testBody)) !== null) {
      cypressCommands.push(match[0]);
    }

    return cypressCommands;
  }

  generateHTML() {
    let resultHTML = `<html>\n<head>\n<title>Strapi Manual</title>\n</head>\n<body>\n`;

    this.testResults.forEach((test) => {
      resultHTML += `<h1>${test.describe}</h1>\n`;

      test.steps.forEach((step) => {
        resultHTML += `<h2>${step.title}</h2>\n`;
        step.commands.forEach((command) => {
          const screenshotMatch = command.match(/cy\.screenshot[\s\S]*?;/);
          if (screenshotMatch) {
            const screenshotName = screenshotMatch[0].match(/"([^"]+)"/)[1];
            resultHTML += `<img src="../screenshots/${test.describe}.cy.js/${screenshotName}.png" alt="${screenshotName}">\n`;
          } else {
            resultHTML += `<p>${command}</p>\n`;
          }
        });
      });
    });

    resultHTML += `</body>\n</html>`;
    return resultHTML;
  }
}

module.exports = CustomReporter;
