// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (user) => {
    let password = "PaWo1337"
    user = user+"@email.com"
    cy.session([user, password], () => { // Login wird über Session-Cookie gecached
        cy.visit('/admin/auth/login');
        cy.get('input[name="email"]') // Email eintragen
            .clear()
            .type(user);
        cy.get('input[name="password"]') // Passwort eintragen
            .clear()
            .type(password);
        cy.get('input[type="checkbox"]') // Login merken
            .click()
            .should("be.checked")
        cy.get('button[type="submit"]') // Absenden
            .click();
        cy.url().should("not.include", "/login"); // Seite sollte nicht mehr Login beinhalten
    })
});