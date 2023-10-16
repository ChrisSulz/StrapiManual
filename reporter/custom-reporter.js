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

  // Filterung von Cypress-Befehlen
  extractCypressCommands(testBody) {
    const cypressCommands = [];

    const regex = /cy\.[\s\S]*?;/g; // Regex-Form für jeden Cypress-Befehl ( cy.(...); )

    let match;
    while ((match = regex.exec(testBody)) !== null) {
      cypressCommands.push(match[0]); // Sammlung aller Cypress-Befehle
    }

    return cypressCommands;
  }

  // HTML-Generierung der Reports
  generateHTML() {
    let reportTitle = "Strapi Manual";
    let CSSFile = "styles.css";
    let resultHTML = `<html>\n<head>\n<title>${reportTitle}</title>\n`; // Titel
    resultHTML += `<link rel="stylesheet" href="${CSSFile}"></link>\n`; // CSS Import
    resultHTML += `</head>\n<body>\n`; // Initialisierung body

    this.testResults.forEach((test) => {
      // cy.describe als Überschrift (h1)
      const [descChapter, ...descTitleArray] = test.describe.split(" ");
      const descTitle = descTitleArray.join(" ");
      resultHTML += `<div class="h1Container">\n`;
      resultHTML += `<h1 id="chapter">${descChapter}</h1>\n`;
      resultHTML += `<h1 id="title">${descTitle}</h1>\n`;
      resultHTML += `</div>\n`;

      test.steps.forEach((step) => {
        // cy.it als Unterüberschrift (h2)
        const [itChapter, ...itTitleArray] = step.title.split(" ");
        const itTitle = itTitleArray.join(" ");
        resultHTML += `<div class="h2Container">\n`;
        resultHTML += `<h2 id="chapter">${itChapter}</h1>\n`;
        resultHTML += `<h2 id="title">${itTitle}</h1>\n`;
        resultHTML += `</div>\n`;

        step.commands.forEach((command) => {
          resultHTML += this.convertCommands(command, test); // Konvertierung einzelner Cypress-Befehle
        });
      });
    });

    resultHTML += `</body>\n</html>`;
    return resultHTML;
  }

  // HTML-Generierung (Converter): Konvertierung der Cypress-Befehle
  convertCommands(command, test) {
    let html = "";

    // Filtern jeweiliger Befehle
    const screenshotMatch = command.match(/cy\.screenshot[\s\S]*?;/);
    const visitMatch = command.match(/cy\.visit[\s\S]*?;/);
    const getMatch = command.match(/cy\.get[\s\S]*?;/);
    const getClickMatch = command.match(/cy\.get[\s\S]*?\.click[\s\S]*?;/);
    const containsClickMatch = command.match(
      /cy\.contains[\s\S]*?\.click[\s\S]*?;/
    );
    const logMatch = command.match(/cy\.log[\s\S]*?;/);

    switch (true) {
      // Passende Screenshots zu cy.screenshot (img)
      // Bsp.: cy.screenshot("contentmanager", {capture: "viewport", overwrite: true,});
      case !!screenshotMatch:
        const screenshotName = screenshotMatch[0].match(/"([^"]+)"/)[1];
        html += `<img src="../screenshots/${test.describe}.cy.js/${screenshotName}.png" alt="${screenshotName}">\n`;
        break;

      // Ziel von cy.visit als Text (p)
      // Bsp.: cy.visit("https://skb-virtuell.de:8080/admin/");
      case !!visitMatch:
        const visitTarget = visitMatch[0].match(/"([^"]+)"/)[1];
        html += `<p>Visit the page <a href="${visitTarget}"><span class="visitTarget">${visitTarget}</span></a></p>\n`;
        break;

      // Befehlsfolgen von cy.get()
      case !!getMatch:
        // if case: Ausgewählte cy.get()-Elemente zum Anklicken als Text (p)
        // if case: Bsp.: cy.get('li:contains("Content Manager")').click();
        // else case: Ausgewählte cy.get()-Elemente per .contains() (p)
        // else case: Bsp.: cy.get("h1").contains("Aussteller");
        if (!!getClickMatch) {
          let getClickTarget;
          // if case: cy.get(...).contains("...").click();
          // else case: cy.get(... "...").click();
          if (getClickMatch[0].match(/[\s\S]*?\.contains[\s\S]*?/)) {
            getClickTarget = getClickMatch[0].match(
              /[\s\S]*?\.contains\("([^"]+)"/
            )[1];
          } else {
            getClickTarget = getClickMatch[0].match(/"([^"]+)"/)[1];
          }
          html += `<p>Click on <span class="clickTarget">${getClickTarget}</span></p>\n`;
        } else {
          const getTarget = getMatch[0].match(
            /[\s\S]*?\.contains\("([^"]+)"/
          )[1];
          html += `<p>You are now in section <span class="getTarget">${getTarget}</span></p>\n`;
        }
        break;

      // Ausgewählte cy.contains()-Elemente zum Anklicken als Text (p)
      // Bsp.: cy.contains("Content Manager").click();
      case !!containsClickMatch:
        const containsClickTarget = containsClickMatch[0].match(/"([^"]+)"/)[1];
        html += `<p>Click on <span class="clickTarget">${containsClickTarget}</span></p>\n`;
        break;

      // Inhalt von cy.log als Text (p)
      // Bsp.: cy.log("Here you can see the overview of Strapi.");
      case !!logMatch:
        const logPhrase = logMatch[0].match(/"([^"]+)"/)[1];
        html += `<p>${logPhrase}</p>\n`;
        break;
    }
    return html;
  }
}

module.exports = CustomReporter;
