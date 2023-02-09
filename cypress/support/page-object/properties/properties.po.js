/// <reference types="cypress"/>

class Properties {
  PropertyHead() {
    return cy
      .contains("span", "Properties")
      .should("exist")
      .should("be.visible");
  }

  AddButton() {
    return cy.contains("button", "Add").should("exist").should("be.visible");
  }

  EditButton() {
    return cy.contains("button", "Edit").should("exist").should("be.visible");
  }

  PropertyName() {
    return cy
      .xpath(
        '(//label[contains(text(),"Property Name")])[1]//preceding::input[1]'
      )
      .should("exist");
  }

  ValidatePropertySlider() {
    return cy
      .contains("span", " Create a new Property")
      .should("exist")
      .should("be.visible");
  }

  ShortDescription() {
    return cy
      .xpath('(//qobrix-form-input[@formcontrolname="short_description"])[1]', {
        timeout: 10000,
      })
      .should("exist");
  }

  SelectPropertyType() {
    return cy
      .xpath('(//qobrix-multi-select[@formcontrolname="property_type"])[1]', {
        timeout: 10000,
      })
      .should("exist");
  }

  SelectHouse() {
    return cy.contains("span", "House").should("exist").should("be.visible");
  }

  SelectAutomationProperty() {
    return cy.xpath('//img[contains(@alt,"Automation Property")]');
  }

  SellerLabel() {
    return cy
      .xpath(
        '//div[contains(text()," Additional features for this property ")]',
        { timeout: 10000 }
      )
      .should("exist");
  }

  AdditionalFeature() {
    return cy
      .xpath(
        '//label[contains(text(),"Additional features")]//preceding::div[1]',
        { timeout: 10000 }
      )
      .should("exist");
  }

  HomeOffice() {
    return cy.xpath('//span[contains(text(),"Home Office ")]').should("exist");
  }

  AirCondition() {
    return cy
      .xpath('//span[contains(text(),"Air Condition ")]')
      .should("exist");
  }

  SelectCreatedProperty() {
    return cy.xpath('//img[@alt="House"]');
  }

  SelectCreatedUpdatedProperty() {
    return cy
      .xpath('(//div[contains(text(),"House")])[1]//preceding::img[1]')
      .should("exist");
  }

  SaveProperty() {
    return cy
      .xpath('//button[contains(text(),"Save")]')
      .should("exist")
      .should("be.visible");
  }

  ClosePanel() {
    return cy
      .xpath('//button[@title="Close Panel"]')
      .should("exist")
      .should("be.visible");
  }

  ValidateCreatedProperty() {
    return cy
      .xpath('(//div[contains(text()," This is short description ")])[1]')
      .should("exist")
      .should("be.visible");
  }

  ValidateCreatedPropertyName() {
    return cy
      .xpath('(//span[contains(text(),"Automation Property")])[1]')
      .should("exist")
      .should("be.visible");
  }

  DeleteProperty() {
    return cy
      .xpath('(//a[@title="Delete"])[1]')
      .should("exist")
      .should("be.visible");
  }

  DeletePropertyFromSlider() {
    return cy
      .xpath('//button[contains(text(),"Delete")]')
      .should("exist")
      .should("be.visible");
  }

  ConfirmDelete() {
    return cy
      .contains("button", " Yes, I'm sure ")
      .should("exist")
      .should("be.visible");
  }

  UploadIcon() {
    return cy.xpath('//svg-icon[@aria-label="upload-icon"]');
  }

  PhotoUpload() {
    return cy.xpath('//input[@type="file"]');
  }

  ConfirmPhotoUpload() {
    return cy.xpath('//button[contains(text()," Submit ")]');
  }

  ValidatePhotoUpload() {
    return cy.xpath(
      '(//div[contains(text()," This is short description ")])[1]//preceding::img[1]'
    );
  }
}
export default Properties;
