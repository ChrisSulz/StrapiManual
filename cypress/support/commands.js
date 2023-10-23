const credentials = require("./credentials.json");

// Automatischer Login-Prozess
Cypress.Commands.add("login", () => {
  const user = credentials.user;
  const password = credentials.password;
  cy.session([user, password], () => {
    // Login wird über Session-Cookie gecached
    cy.visit("/");
    cy.get('input[name="email"]') // Email eintragen
      .clear()
      .type(user);
    cy.get('input[name="password"]') // Passwort eintragen
      .clear()
      .type(password);
    cy.get('input[type="checkbox"]') // Login merken
      .click()
      .should("be.checked");
    cy.get('button[type="submit"]') // Absenden
      .click();
    cy.url().should("not.include", "/login"); // Seite sollte nicht mehr Login beinhalten
  });
});

// Entfernen von Update-Popups
Cypress.Commands.add("closeUpdate", () => {
  cy.wait(100);
  cy.get('button[aria-label="Close"]')
    .should("exist")
    .then((element) => {
      cy.wrap(element).click();
    });
});

// Vollständiger Initialisierungsprozess
Cypress.Commands.add("initialise", () => {
  cy.login();
  cy.visit("/");
  cy.closeUpdate();
});
