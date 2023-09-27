describe("01 Another Test", () => {
  it("spec example 01", () => {
    cy.visit("https://example.cypress.io");
    cy.screenshot("example", {
      capture: "fullPage",
      overwrite: true,
    });
  });
});
