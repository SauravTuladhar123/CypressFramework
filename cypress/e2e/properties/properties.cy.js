/// <reference types="cypress"/>

import Properties from "../../support/page-object/properties/properties.po";

describe("Properties Module", () => {
  const properties = new Properties();
  beforeEach(() => {
    cy.Login();
    cy.visit("");
    cy.url().should(
      "eq",
      Cypress.config("baseUrl") +
        "/crm/properties?page=1&limit=15&sort=-Properties.created"
    );
  });

  it("Create and validate a Property with automated property name enabled", () => {
    cy.setSystemSetting("property_auto_name", true);
    cy.fixture("userdata").then((data) => {
      properties.AddButton().click();
      properties
        .ValidatePropertySlider()
        .should("contain.text", " Create a new Property");
      properties.UploadIcon().click();
      properties
        .PhotoUpload()
        .invoke("show")
        .selectFile(
          "\\cypressframework\\cypress\\fixtures\\property_feature_image.jpeg"
        );
      properties.ConfirmPhotoUpload().click();
      properties
        .ShortDescription()
        .type(data.properties_Data[0].shortDescription);
      properties.SelectPropertyType().click();
      properties.SelectHouse().click();
      //Additional feature code
      /* properties.SellerLabel().scrollIntoView();
      properties.AdditionalFeature().click();
      properties.HomeOffice().click();
      properties.AirCondition().click(); */
      properties.SaveProperty().click();
      properties.ClosePanel().click();
      properties.SelectCreatedProperty().first().click();
      properties
        .ValidatePhotoUpload()
        .invoke("attr", "src")
        .should("contain", "/api/v2/files/download/media");
      properties
        .ValidateCreatedProperty()
        .should("contain.text", data.properties_Data[0].shortDescription);
    });
  });

  it("Update and validate a Property with automated property name enabled", () => {
    cy.setSystemSetting("property_auto_name", true);
    cy.fixture("userdata").then((data) => {
      properties.SelectCreatedProperty().click();
      properties.EditButton().click();
      properties
        .ShortDescription()
        .type(data.properties_Data[0].updatePropertyText);
      properties.SaveProperty().click();
      properties.ClosePanel().click().wait(3000);
      properties.SelectCreatedProperty().click({ force: true });
      properties
        .ValidateCreatedProperty()
        .should(
          "contain.text",
          data.properties_Data[0].shortDescription +
            data.properties_Data[0].updatePropertyText
        );
    });
  });

  it("Delete and validate a property with automated property name enabled", () => {
    cy.fixture("userdata").then((data) => {
      properties.DeleteProperty().click();
      properties.ConfirmDelete().click();
      properties.SelectCreatedProperty().should("not.exist");
    });
  });

  it("Create and validate a Property with automated property name disabled", () => {
    cy.setSystemSetting("property_auto_name", false);
    cy.fixture("userdata").then((data) => {
      properties.AddButton().click();
      properties
        .ValidatePropertySlider()
        .should("contain.text", " Create a new Property");
      properties.UploadIcon().click();
      properties
        .PhotoUpload()
        .invoke("show")
        .selectFile(
          "\\cypressframework\\cypress\\fixtures\\property_feature_image.jpeg"
        );
      properties.ConfirmPhotoUpload().click();
      properties.PropertyName().type(data.properties_Data[0].propertyName);
      properties
        .ShortDescription()
        .type(data.properties_Data[0].shortDescription);
      properties.SelectPropertyType().click();
      properties.SelectHouse().click();
      //Additional feature code
      /* properties.SellerLabel().scrollIntoView();
      properties.AdditionalFeature().click();
      properties.HomeOffice().click();
      properties.AirCondition().click(); */
      properties.SaveProperty().click();
      properties.ClosePanel().click();
      properties.SelectAutomationProperty().wait(2000).click();
      properties
        .ValidatePhotoUpload()
        .invoke("attr", "src")
        .should("contain", "/api/v2/files/download/media");
      properties
        .ValidateCreatedPropertyName()
        .should("contain.text", data.properties_Data[0].propertyName);
      properties
        .ValidateCreatedProperty()
        .should("contain.text", data.properties_Data[0].shortDescription);
    });
  });

  it("Update and validate a Property with automated property name disabled", () => {
    cy.setSystemSetting("property_auto_name", false);
    cy.fixture("userdata").then((data) => {
      properties.SelectAutomationProperty().click();
      properties.EditButton().click();
      properties
        .PropertyName()
        .type(data.properties_Data[0].updatePropertyText);
      properties
        .ShortDescription()
        .type(data.properties_Data[0].updatePropertyText);
      properties.SaveProperty().click();
      properties.ClosePanel().click().wait(3000);
      properties.SelectAutomationProperty().click({ force: true });
      properties
        .ValidateCreatedPropertyName()
        .should(
          "contain.text",
          data.properties_Data[0].propertyName +
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

  it("Delete and validate property with automated property name disabled", () => {
    cy.fixture("userdata").then((data) => {
      properties.SelectAutomationProperty().click();
      properties.DeletePropertyFromSlider().click();
      properties.ConfirmDelete().click();
      properties.SelectAutomationProperty().should("not.exist");
    });
  });
});
