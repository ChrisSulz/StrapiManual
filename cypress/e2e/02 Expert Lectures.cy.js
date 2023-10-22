describe("02 Expert Lectures", () => {
  beforeEach(() => {
    cy.initialise();
  });

  it("A Create a new expert lecture", () => {
    cy.visit("https://test.skb-virtuell.de:8080/admin/");
    cy.get('li:contains("Content Manager")').click();
    cy.get("li span").contains("Fachvortrag", { matchCase: false }).click();

    cy.wait(1000);
    cy.screenshot("contentmanager-fachvortrag-01", {
      capture: "viewport",
      overwrite: true,
    });

    cy.get("h1").contains("Fachvortrag");
    cy.contains("Create new entry").click();

    cy.wait(1000);
    cy.screenshot("create-new-entry", {
      capture: "viewport",
      overwrite: true,
    });

    cy.get("input#aussteller").click().wait(250).type("{enter}");
    cy.get("input#datum")
      .click()
      .wait(250)
      .get("button")
      .contains("28")
      .click();
    cy.get("button#start_time").click().get("#start_time-option-12-00").click();
    cy.get("button#end_time").click().get("#end_time-option-14-00").click();
    cy.get("input#title").click().type("test title");
    cy.get(".CodeMirror-scroll").type(
      "This is just a test typing to fill the text input with enough characters."
    );
    cy.get("button span").contains("Save").click({ force: true });

    cy.wait(1000);
    cy.screenshot("fachvortrag-saved", {
      capture: "viewport",
      overwrite: true,
    });

    cy.get("button span").contains("Publish").click({ force: true });

    cy.wait(1000);
    cy.screenshot("fachvortrag-published", {
      capture: "viewport",
      overwrite: true,
    });
  });

  it("B Delete an expert lecture", () => {
    cy.visit("https://test.skb-virtuell.de:8080/admin/");
    cy.get('li:contains("Content Manager")').click();
    cy.get("li span").contains("Fachvortrag", { matchCase: false }).click();

    cy.wait(1000);
    cy.screenshot("contentmanager-fachvortrag-02", {
      capture: "viewport",
      overwrite: true,
    });

    cy.get("h1").contains("Fachvortrag");
    cy.get("button span").contains("Delete item line 0").click({ force: true });

    cy.wait(1000);
    cy.screenshot("contentmanager-fachvortrag-delete-confirmation", {
      capture: "viewport",
      overwrite: true,
    });

    cy.get("button span").contains("Confirm").click({ force: true });

    cy.wait(1000);
    cy.screenshot("contentmanager-fachvortrag-deleted", {
      capture: "viewport",
      overwrite: true,
    });
  });
});
