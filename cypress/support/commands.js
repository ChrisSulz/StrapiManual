// Automatischer Login-Prozess
Cypress.Commands.add("login", (user) => {
  let password;
  switch (user) {
    case "admin":
      password = "QKbjoKly2x";
      break;
    case "editor":
      password = "s5JBkoNzij";
      break;
    case "author":
      password = "2f17xncDtX";
      break;
  }
  cy.session([user, password], () => {
    // Login wird über Session-Cookie gecached
    cy.visit("/");
    cy.get('input[name="email"]') // Email eintragen
      .clear()
      .type(user + "@email.com");
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
  cy.get('button[aria-label="Close"]')
    .should("exist")
    .then((element) => {
      cy.wrap(element).click();
    });
});

// Vollständiger Initialisierungsprozess
Cypress.Commands.add("initialise", (user) => {
  cy.login(user);
  cy.visit("/");
  cy.closeUpdate();
});
