describe("01 Content Manager", () => {
  beforeEach(() => {
    cy.login("admin");
    cy.visit("/admin");
  });

  it("A Open Content Manager", () => {
    cy.visit("https://test.skb-virtuell.de:8080/admin/");
    cy.get('li:contains("Content Manager")').click();
    cy.wait(1000);
    cy.screenshot("contentmanager", {
      capture: "viewport", // Alternative: "fullPage" (fehlerhaft replizierte Anzeige in nicht-scrollbaren Bereichen)
      overwrite: true,
    });
    cy.log("Here you can see the overview of Strapi.");
  });

  it("B Create a new entry", () => {
    cy.get('li:contains("Content Manager")').click(); // Alternativ: cy.contains("Content Manager").click();
    cy.contains("Create new entry").click();
    cy.wait(1000);
    cy.screenshot("create-new-entry", {
      capture: "viewport",
      overwrite: true,
    });
  });
});
