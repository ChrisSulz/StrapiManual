describe("02 Another Test", () => {
  it("A spec example 01", () => {
    cy.visit("https://example.cypress.io");
    cy.log("just a phrase sample.");
    cy.screenshot("example", {
      capture: "fullPage",
      overwrite: true,
    });
  });
});
