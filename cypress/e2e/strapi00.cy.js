/// <reference types= "cypress" />

describe('My Tests', () => {

    before(() => {
      cy.login("admin")
    });

    beforeEach(() => {
        cy.visit("/admin")
    })
  
    it('first test', () => {
      cy.contains("Content Manager").click()
    });
  });