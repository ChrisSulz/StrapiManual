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
    // Begrüßungstext
    cy.get("span")
      .contains("begruessung")
      .closest("div")
      .next("div")
      .find(".CodeMirror-scroll")
      .type("{upArrow}");
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

    cy.get(
      'div[aria-describedby="alumniStorie-item-instructions"]'
    ).scrollIntoView({ offset: { top: -100, left: 0 } });

    cy.wait(1000);
    cy.screenshot("contentmanager-homepage-03", {
      capture: "viewport",
      overwrite: true,
    });

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
    // Name der Alumni-Story
    cy.get(
      'div[aria-describedby="alumniStorie-item-instructions"] > div:last-of-type'
    )
      .contains("name")
      .closest("label")
      .next("div")
      .find("input")
      .type("test name");
    // Beschreibung der Alumni-Story
    cy.get(
      'div[aria-describedby="alumniStorie-item-instructions"] > div:last-of-type'
    )
      .contains("beschreibung")
      .closest("div")
      .next("div")
      .find(".CodeMirror-scroll")
      .type("test description");
    // (Asset) Bild wird hinzugefügt
    cy.get(
      'div[aria-describedby="alumniStorie-item-instructions"] > div:last-of-type'
    )
      .contains("bild")
      .closest("label")
      .next("div")
      .find("button span")
      .contains("Click to add an asset or drag and drop one in this area")
      .click();

    cy.wait(1000);
    cy.screenshot("homepage-alumni-stories-assets-bild", {
      capture: "viewport",
      overwrite: true,
    });

    // cy.get("button span").contains("Save").click({ force: true });
  });
});
