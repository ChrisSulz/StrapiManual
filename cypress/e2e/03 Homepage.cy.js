describe("03 Homepage", () => {
  beforeEach(() => {
    cy.initialise();
  });

  it("A Change text on landing page", () => {
    cy.visit("https://test.skb-virtuell.de:8080/admin/");
    cy.get('li:contains("Content Manager")').click();
    cy.get("li span").contains("Homepage", { matchCase: false }).click();

    cy.wait(1000);
    cy.screenshot("contentmanager-homepage", {
      capture: "viewport",
      overwrite: true,
    });

    cy.get("h1").contains("Homepage");
    cy.get("input#ueberschrift").click();
    cy.get("input#zeitraum").click();
    cy.get(".CodeMirror-scroll");
    cy.get("button span").contains("Save").click({ force: true });

    cy.wait(1000);
    cy.screenshot("homepage-saved", {
      capture: "viewport",
      overwrite: true,
    });
  });
});
