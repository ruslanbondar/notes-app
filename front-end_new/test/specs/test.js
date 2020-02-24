const expect = require("chai").expect;

describe("Notes App", () => {
  const titleText = "New title";
  const descriptionText = "New description";
  const newTitleText = "Updated title";
  const newDescriptionText = "Updated description";

  beforeEach(() => {
    browser.url("http://localhost:3000/");
  });

  it("Should load with the right title", () => {
    const actualTitle = browser.getTitle();

    expect(actualTitle).to.eql("Notes App");
  });

  it("Should allow me to create a Note", () => {
    $(".add-title").setValue(titleText);
    $(".add-description").setValue(descriptionText);
    $(".home__add-button").click();
    const title = $(".note-title").getText();
    const description = $(".note-description").getText();

    expect(title).to.equal(titleText);
    expect(description).to.equal(descriptionText);
  });

  it("Should allow me to update a Note", () => {
    $(".edit-note").click();
    $(".title-edit").setValue(newTitleText);
    $(".description-edit").setValue(newDescriptionText);
    $(".update-button").click();
    const title = $(".note-title").getText();
    const description = $(".note-description").getText();

    expect(title).to.equal(titleText);
    expect(description).to.equal(descriptionText);
  });

  it("Should allow me to move Note to trash cart", () => {
    $(".delete-note").click();
    const title = $(".note-title");
    const description = $(".note-description");

    expect(title.state).to.equal(undefined);
    expect(description.state).to.equal(undefined);
  });

  it("Should allow me to restore a Note", () => {
    $(".trash-icon").click();
    $(".restore-note").click();
  });

  it("Should allow me to move Note to trash cart", () => {
    $(".delete-note").click();
    const title = $(".note-title");
    const description = $(".note-description");

    expect(title.state).to.equal(undefined);
    expect(description.state).to.equal(undefined);
  });

  it("Should allow me to delete a Note", () => {
    $(".trash-icon").click();
    $(".remove-note").click();
  });
});
