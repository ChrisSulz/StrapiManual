const fs = require("fs");
const path = require("path");

class CustomReporter {
  constructor(runner, options) {
    this.outputDir =
      (options.reporterOptions && options.reporterOptions.reportDir) ||
      "cypress/custom-reports";
    this.testResults = [];

    // (Mocha) Event-Listener für Test-Suite "describe" --> currentTest
    runner.on("suite", (suite) => {
      this.currentTest = {
        describe: suite.title,
        steps: [],
      };
    });

    // (Mocha) Event-Listener für Test "it" --> step
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

    // (Mocha) Event-Listener für Testabschluss
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

    const regex = /cy\.[\s\S]*?;/g; // Regex-Form für jeden Cypress-Befehl ( cy.(...); )

    let match;
    while ((match = regex.exec(testBody)) !== null) {
      cypressCommands.push(match[0]); // Sammlung aller Cypress-Befehle
    }

    return cypressCommands;
  }

  generateHTML() { // HTML-Generierung der Reports
    let resultHTML = `<html>\n<head>\n<title>Strapi Manual</title>\n`; // (HTML) Titel
    resultHTML += `<link rel="stylesheet" href="styles.css"></link>\n`; // (HTML) CSS Import
    resultHTML += `</head>\n<body>\n`; // (HTML) Initialisierung body

    this.testResults.forEach((test) => {
      resultHTML += `<h1>${test.describe}</h1>\n`; // (HTML) cy.describe als Überschrift (h1)

      test.steps.forEach((step) => {
        resultHTML += `<h2>${step.title}</h2>\n`; // (HTML) cy.it als Unterüberschrift (h2)
        step.commands.forEach((command) => {
          resultHTML += this.convertCommands(command, test);
        });
      });
    });

    resultHTML += `</body>\n</html>`;
    return resultHTML;
  }

  convertCommands(command, test) { // HTML-Generierung (Converter): Konvertierung der Cypress-Befehle
    let html = "";

    const screenshotMatch = command.match(/cy\.screenshot[\s\S]*?;/);
    const logMatch = command.match(/cy\.log[\s\S]*?;/);

    switch (true) {
      case !!screenshotMatch:
        const screenshotName = screenshotMatch[0].match(/"([^"]+)"/)[1];
        html += `<img src="../screenshots/${test.describe}.cy.js/${screenshotName}.png" alt="${screenshotName}">\n`; // (HTML) Passende Screenshots zu cy.screenshot (img)
        break;

      case !!logMatch:
        const logPhrase = logMatch[0].match(/"([^"]+)"/)[1];
        html += `<p>${logPhrase}</p>\n`; // (HTML) Inhalt von cy.log als Text (p)
        break;

      default:
        html += `<p>${command}</p>\n`; // (HTML) cy-Befehle als Text (p)
        break;
    }
    return html;
  }
}

module.exports = CustomReporter;
