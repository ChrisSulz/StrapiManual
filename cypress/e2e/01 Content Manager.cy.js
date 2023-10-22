describe("01 Content Manager", () => {
  beforeEach(() => {
    cy.initialise();
  });

  it("A Unpublishing an exhibitor", () => {
    cy.visit("https://test.skb-virtuell.de:8080/admin/");
    cy.get('li:contains("Content Manager")').click();
    cy.get("li span").contains("Aussteller", { matchCase: false }).click();

    cy.wait(1000);
    cy.screenshot("contentmanager-aussteller-02", {
      capture: "viewport",
      overwrite: true,
    });

    cy.get("h1").contains("Aussteller");
    cy.get("main table tbody tr span").contains("Published").first().click();

    cy.wait(1000);
    cy.screenshot("contentmanager-aussteller-entry-published-02", {
      capture: "viewport",
      overwrite: true,
    });

    // (!) force: true ist notwendig, da das <span>-Element vom <button>-Element überlappt wird
    cy.get("button span").contains("Unpublish").click({ force: true });

    cy.wait(1000);
    cy.screenshot("contentmanager-aussteller-entry-confirmation-unpublish", {
      capture: "viewport",
      overwrite: true,
    });

    // (!) force: true ist notwendig, da das <span>-Element vom <button>-Element überlappt wird
    cy.get("button span").contains("Yes, confirm").click({ force: true });

    cy.wait(1000);
    cy.screenshot("contentmanager-aussteller-entry-unpublished", {
      capture: "viewport",
      overwrite: true,
    });
  });

  it("B Publishing an exhibitor", () => {
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
    cy.screenshot("contentmanager-aussteller-entry-published-01", {
      capture: "viewport",
      overwrite: true,
    });
  });
});
