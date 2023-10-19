describe("02 Just Testing", () => {
  beforeEach(() => {
    cy.initialise("editor");
  });

  it("A Test Click on exhibitor", () => {
    cy.visit("https://test.skb-virtuell.de:8080/admin/");
    cy.get('li:contains("Content Manager")').click();
    cy.get("li span").contains("Aussteller", { matchCase: false }).click();

    cy.wait(1000);
    cy.screenshot("contentmanager-aussteller-test", {
      capture: "viewport",
      overwrite: true,
    });
  });
});
