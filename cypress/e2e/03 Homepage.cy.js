describe("03 Homepage", () => {
  beforeEach(() => {
    cy.initialise();
  });

  it("A Change text on landing page", () => {
    cy.visit("https://test.skb-virtuell.de:8080/admin/");
    cy.get('li:contains("Content Manager")').click();
    cy.get("li span").contains("Homepage", { matchCase: false }).click();

    cy.wait(1000);
    cy.screenshot("contentmanager-homepage-01", {
      capture: "viewport",
      overwrite: true,
    });

    cy.get("h1").contains("Homepage");
    cy.get("input#ueberschrift").click();
    cy.get("input#zeitraum").click();
    cy.get(".CodeMirror-scroll");
    // cy.get("button span").contains("Save").click({ force: true });

    cy.wait(1000);
    cy.screenshot("homepage-saved-01", {
      capture: "viewport",
      overwrite: true,
    });
  });

  it("B Add an Alumni Story", () => {
    cy.visit("https://test.skb-virtuell.de:8080/admin/");
    cy.get('li:contains("Content Manager")').click();
    cy.get("li span").contains("Homepage", { matchCase: false }).click();

    cy.wait(1000);
    cy.screenshot("contentmanager-homepage-02", {
      capture: "viewport",
      overwrite: true,
    });

    cy.get("h1").contains("Homepage");
    cy.scrollTo("bottom");
    cy.get("label").contains("alumniStorie");
    cy.get(
      'div[aria-describedby="alumniStorie-item-instructions"] + div button span'
    )
      .contains("Add an entry")
      .click({ force: true });

    cy.wait(1000);
    cy.screenshot("homepage-alumni-stories", {
      capture: "viewport",
      overwrite: true,
    });

    cy.wait(1000);
    cy.get("input#alumniStorie\\.1\\.name").click();
    // cy.get(".CodeMirror-scroll");
    // cy.get("button span")
    //   .contains("Click to add an asset or drag and drop one in this area")
    //   .click({ force: true });
    // cy.get("button span").contains("Save").click({ force: true });
  });
});
