describe("01 Content Manager", () => {
  beforeEach(() => {
    cy.initialise();
  });

  it("A Open Content Manager", () => {
    cy.visit("https://skb-virtuell.de:8080/admin/");
    cy.contains("Content Manager").click();
    // Alternative: cy.get('li:contains("Content Manager")').click(); (convertCommands() tbd)
    cy.wait(1000);
    cy.screenshot("contentmanager", {
      capture: "viewport", // Alternative: "fullPage" (fehlerhaft replizierte Anzeige in nicht-scrollbaren Bereichen)
      overwrite: true,
    });
    cy.log("Here you can see the overview of Strapi.");
  });

  it("B Create a new entry", () => {
    cy.contains("Content Manager").click();
    // Alternative: cy.get('li:contains("Content Manager")').click(); (convertCommands() tbd)
    cy.contains("Create new entry").click();
    cy.wait(1000);
    cy.screenshot("create-new-entry", {
      capture: "viewport",
      overwrite: true,
    });
  });
});
