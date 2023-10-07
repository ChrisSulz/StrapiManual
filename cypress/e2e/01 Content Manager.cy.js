describe("01 Content Manager", () => {
  beforeEach(() => {
    cy.initialise();
  });

  it("A Open Content Manager", () => {
    cy.contains("Content Manager").click();
    cy.wait(1000);
    cy.screenshot("contentmanager", {
      capture: "fullPage",
      overwrite: true,
    });
    cy.log("Here you can see the overview of Strapi.");
  });

  it("B Create a new entry", () => {
    cy.contains("Content Manager").click();
    cy.contains("Create new entry").click();
    cy.wait(1000);
    cy.screenshot("create-new-entry", {
      capture: "fullPage",
      overwrite: true,
    });
  });
});
