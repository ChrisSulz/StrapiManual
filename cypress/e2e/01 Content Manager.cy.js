describe("01 Content Manager", () => {
  beforeEach(() => {
    cy.initialise("editor");
  });

  it("A Publishing an exhibitor", () => {
    cy.visit("https://test.skb-virtuell.de:8080/admin/");
    cy.get('li:contains("Content Manager")').click();
    cy.get("li span").contains("Aussteller", { matchCase: false }).click();
    cy.wait(1000);
    cy.screenshot("contentmanager-aussteller", {
      capture: "viewport",
      overwrite: true,
    });
    cy.get("h1").contains("Aussteller");
    cy.get("main table tbody tr").first().click();
  });
});
