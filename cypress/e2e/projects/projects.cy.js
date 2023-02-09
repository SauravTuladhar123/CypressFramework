/// <reference types="cypress"/>

import Projects from "../../support/page-object/project/project.po";
import Properties from "../../support/page-object/properties/properties.po";

describe("Projects Module", () => {
  const projects = new Projects();
  const properties = new Properties();
  beforeEach(() => {
    cy.Login();
    cy.visit("");
    projects.ProjectSideBar().click();
    cy.url().should(
      "eq",
      Cypress.config("baseUrl") +
        "/crm/projects?page=1&limit=25&sort=-Projects.created"
    );
  });

  it("Create/validate a Project", () => {
    cy.fixture("userdata").then((data) => {
      properties.AddButton().click();
      projects
        .ValidateProjectSlider()
        .should("contain.text", " Create a new Project");
      properties.UploadIcon().click();
      properties
        .PhotoUpload()
        .invoke("show")
        .selectFile(
          "\\cypressframework\\cypress\\fixtures\\property_feature_image.jpeg"
        );
      properties.ConfirmPhotoUpload().click();
      projects.ProjectName().type(data.projects_Data[0].projectName);
      properties
        .ShortDescription()
        .type(data.properties_Data[0].shortDescription);
      properties.SaveProperty().click();
      projects
        .ValidateProjectName()
        .should("contain.text", data.projects_Data[0].projectName);
      properties
        .ValidateCreatedProperty()
        .should("contain.text", data.properties_Data[0].shortDescription);
      properties
        .ValidatePhotoUpload()
        .invoke("attr", "src")
        .should("contain", "/api/v2/files/download/media");
    });
  });

  it("Update/validate an existing Project", () => {
    cy.fixture("userdata").then((data) => {
      projects.SelectCreatedProject().click();
      properties.EditButton().click();
      properties
        .ShortDescription()
        .type(data.properties_Data[0].updatePropertyText);
      projects.ProjectName().type(data.properties_Data[0].updatePropertyText);
      properties.SaveProperty().click();
      projects
        .ValidateProjectName()
        .should(
          "contain.text",
          data.projects_Data[0].projectName +
            data.properties_Data[0].updatePropertyText
        );
      properties
        .ValidateCreatedProperty()
        .should(
          "contain.text",
          data.properties_Data[0].shortDescription +
            data.properties_Data[0].updatePropertyText
        );
    });
  });

  it("Delete an existing Project", () => {
    cy.fixture("userdata").then((data) => {
      projects.SelectCreatedProject().click();
      properties.DeletePropertyFromSlider().click();
      properties.ConfirmDelete().click();
      projects.ValidateProjectName().should("not.exist");
    });
  });
});
