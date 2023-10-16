describe("01 Content Manager", () => {
  beforeEach(() => {
    cy.initialise("editor");
  });

  it("A Publishing an exhibitor", () => {
    cy.visit("https://test.skb-virtuell.de:8080/admin/");
    cy.get('li:contains("Content Manager")').click();
    cy.get("li span").contains("Aussteller", { matchCase: false }).click();

    cy.wait(1000);
    cy.screenshot("contentmanager-aussteller-01", {
      capture: "viewport",
      overwrite: true,
    });

    cy.get("h1").contains("Aussteller");
    cy.get("main table tbody tr span").contains("Draft").first().click();

    cy.wait(1000);
    cy.screenshot("contentmanager-aussteller-entry-draft", {
      capture: "viewport",
      overwrite: true,
    });

    // (!) force: true ist notwendig, da das <span>-Element vom <button>-Element überlappt wird
    cy.get("button span").contains("Publish").click({ force: true });

    cy.wait(1000);
    cy.screenshot("contentmanager-aussteller-entry-published", {
      capture: "viewport",
      overwrite: true,
    });
  });
});
