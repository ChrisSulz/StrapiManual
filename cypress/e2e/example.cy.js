/// <reference types= "cypress" />

describe('My first test examples', () => {
  
  beforeEach(() => {
    cy.visit("/")
  })

  it('try button at get', () => {
    cy.visit("/commands/querying")
    cy.contains("button", "Button")
      .click()
  })
})