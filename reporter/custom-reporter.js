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
      const outputPath = path.resolve(this.outputDir, "report.html");
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
    const formattedResults = this.testResults.map((test) => {
      let resultHTML = `<h1>${test.describe}</h1>\n`;

      test.steps.forEach((step) => {
        resultHTML += `<h2>${step.title}</h2>\n`;
        step.commands.forEach((command) => {
          resultHTML += `<p>${command}</p>\n`;

          // Füge Screenshot als <img> ein, falls der Befehl cy.screenshot enthalten ist
          //   const screenshotMatch = command.match(/cy\.screenshot\("([^"]+)"\)/);
          //   if (screenshotMatch) {
          //     const screenshotName = screenshotMatch[1];
          //     const screenshotPath = path.join(
          //       "cypress/screenshots",
          //       `${test.describe}`,
          //       `${screenshotName}.png`
          //     );
          //     resultHTML += `<img src="${screenshotPath}" alt="${screenshotName}">\n`;
          //   }
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
