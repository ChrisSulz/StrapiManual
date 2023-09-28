/// <reference types= "cypress" />

describe("00 First Test", () => {
  before(() => {
    cy.login("admin");
  });

  beforeEach(() => {
    cy.visit("/admin");
  });

  it("first test", () => {
    cy.contains("Content Manager").click();
    cy.wait(1000);
    cy.screenshot("contentmanager", {
      capture: "fullPage",
      overwrite: true,
    });
    cy.log("Hier sehen Sie die Benutzeroberfläche von Strapi.");
  });
});
