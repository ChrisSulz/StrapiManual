const fs = require("fs");
const path = require("path");

class CustomReporter {
  constructor(runner, options) {
    this.outputDir = (options.reporterOptions && options.reporterOptions.reportDir) || "cypress/custom-reports";
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
      const outputPath = path.resolve(this.outputDir, `${this.currentTest.describe}.html`);
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
    // HEAD
    let reportTitle = "Strapi Manual";
    let CSSFile = "styles.css";
    let resultHTML = `<html>\n<head>\n<title>${reportTitle}</title>\n`; // Titel
    resultHTML += `<link rel="stylesheet" href="${CSSFile}"></link>\n`; // CSS Import
    resultHTML += `</head>\n<body>\n`; // Initialisierung body

    // BODY
    this.testResults.forEach((test) => {
      // cy.describe als Überschrift (h1)
      const [descChapter, ...descTitleArray] = test.describe.split(" ");
      const descTitle = descTitleArray.join(" ");
      resultHTML += `<div class="h1Container">\n`;
      resultHTML += `<h1><span id="chapter">${descChapter}</span> <span id="title">${descTitle}</span></h1>\n`;
      resultHTML += `</div>\n`;

      test.steps.forEach((step) => {
        // cy.it als Unterüberschrift (h2)
        const [itChapter, ...itTitleArray] = step.title.split(" ");
        const itTitle = itTitleArray.join(" ");
        resultHTML += `<div class="h2Container">\n`;
        resultHTML += `<h2><span id="chapter">${itChapter}</span> <span id="title">${itTitle}</span></h2>\n`;
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
    const containsClickMatch = command.match(/cy\.contains[\s\S]*?\.click[\s\S]*?;/);
    const scrollMatch =
      command.match(/cy\.[\s\S]*?\.scrollTo[\s\S]*?;/) || command.match(/cy\.[\s\S]*?\.scrollIntoView[\s\S]*?;/);
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

      // Scroll in gewisse Richtung
      // Bsp.: cy.scrollTo("...");
      case !!scrollMatch:
        html += `<p>Scroll to the desired section</p>\n`;
        break;

      // Befehlsfolgen von cy.get()
      case !!getMatch:
        // Filtern jeweiliger cy.get()-Befehle
        const getCodeMirrorMatch = command.match(/cy\.get\("\.CodeMirror-scroll"\)[\s\S]*?;/);
        const getContainsTypeMatch = command.match(/cy\.get[\s\S]*?\.contains[\s\S]*?\.type\("([^"]+)"\);/);
        const getClickMatch = command.match(/cy\.get[\s\S]*?\.click[\s\S]*?;/);
        const getContainsMatch = command.match(/cy\.get[\s\S]*?\.contains\("([^"]+)"\);/);

        switch (true) {
          // Spezialfall: cy.get(".CodeMirror-scroll").type("..."); => Textfeld (p)
          case !!getCodeMirrorMatch:
            html += `<p>Write something into the <span class="InputTarget">text field</span></p>\n`;
            break;

          // Ausgewählte cy.get()-Elemente (Selektion mithilfe "contains()"), in welche etwas getippt wird (p)
          // Bsp.: cy.get("input")...contains("name")...type("...");
          case !!getContainsTypeMatch:
            const getTypeTarget = getContainsTypeMatch[0].match(/[\s\S]*?\.contains\("([^"]+)"/)[1];
            html += `<p>Input a <span class="InputTarget">${getTypeTarget}</span> entry</p>\n`;
            break;

          // Ausgewählte cy.get()-Elemente zum Anklicken als Text (p)
          // Bsp.: cy.get('li:contains("Content Manager")').click();
          case !!getClickMatch:
            let getClickTarget;

            switch (true) {
              // Spezialfall: cy.get("...").contains("Delete item line ...").click();
              case !!getClickMatch[0].match(/[\s\S]*?\.contains\("Delete item line[\s\S]*?/):
                getClickTarget = "Delete";
                break;
              // cy.get(input#...).click();
              case !!getClickMatch[0].match(/[\s\S]*?input#/):
                const getInputTarget = getClickMatch[0].match(/[\s\S]*?.get\("input#([^"]+)"/)[1];
                html += `<p>Input a <span class="InputTarget">${getInputTarget}</span> entry</p>\n`;
                break;
              // cy.get(button#...).click();
              case !!getClickMatch[0].match(/[\s\S]*?button#/):
                const getButtonInputTarget = getClickMatch[0].match(/[\s\S]*?.get\("button#([^"]+)"/)[1];
                html += `<p>Choose a <span class="InputTarget">${getButtonInputTarget}</span> entry</p>\n`;
                break;
              // cy.get(...).first().click();
              case !!getClickMatch[0].match(/[\s\S]*?\.first/):
                const getFirstClickTarget = getClickMatch[0].match(/[\s\S]*?\.contains\("([^"]+)"/)[1];
                html += `<p>Click on any <span class="firstClickTarget">${getFirstClickTarget}</span> entry</p>\n`;
                break;
              // cy.get(...).contains("...").click();
              case !!getClickMatch[0].match(/[\s\S]*?\.contains[\s\S]*?/):
                // if case: cy.get(...).contains("...")...input[type="checkbox"]...click();
                if (getClickMatch[0].match(/[\s\S]*?input\[type="checkbox"\][\s\S]*?;/)) {
                  const getContainsTarget = getClickMatch[0].match(/[\s\S]*?\.contains\("([^"]+)"/)[1];
                  html += `<p>Select an item from <span class="clickTarget">${getContainsTarget}</span></p>\n`;
                  break;
                }
                getClickTarget = getClickMatch[0].match(/[\s\S]*?\.contains\("([^"]+)"/)[1];
                break;
              // cy.get(... "...").click();
              default:
                getClickTarget = getClickMatch[0].match(/"([^"]+)"/)[1];
                break;
            }

            if (getClickTarget) html += `<p>Click on <span class="clickTarget">${getClickTarget}</span></p>\n`;
            break;

          // Ausgewählte cy.get()-Elemente per .contains() (p)
          // Bsp.: cy.get("h1").contains("Aussteller");
          case !!getContainsMatch:
            const getTarget = getMatch[0].match(/[\s\S]*?\.contains\("([^"]+)"/)[1];
            html += `<p>You are now in section <span class="getTarget">${getTarget}</span></p>\n`;
            break;
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
