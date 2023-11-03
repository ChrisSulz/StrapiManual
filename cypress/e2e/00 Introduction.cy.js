describe("00 Introduction", () => {
  beforeEach(() => {
    cy.initialise();
  });

  it("Exemplary Testing", () => {
    cy.visit("https://test.skb-virtuell.de:8080/admin/");
    cy.log("The following tests various elements on the skb-virtuell website and generates a report as a user manual.");
    cy.log(
      "This does not encompass testing the entire website, as the test operations are based solely on exemplary processes."
    );

    cy.wait(1000);
    cy.screenshot("strapi-homepage", {
      capture: "viewport",
      overwrite: true,
    });
  });
});
