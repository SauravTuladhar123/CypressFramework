/// <reference types="cypress"/>

class Login {
  Username() {
    return cy.get("input[type=email]").should("exist").should("be.visible");
  }

  Password() {
    return cy.get("input[type=password]").should("exist").should("be.visible");
  }

  LoginBtn() {
    return cy.get("button[type=submit]").should("exist").should("be.visible");
  }

  ToastMessage() {
    return cy
      .get("div[class='mt-6 mb-6 text-base text-center text-red-500']")
      .should("exist")
      .should("be.visible");
  }

  EmailRequired() {
    return cy
      .xpath(
        '//container-element[contains(text()," Email address or username is required. ")]'
      )
      .should("exist")
      .should("be.visible");
  }

  PasswordRequired() {
    return cy
      .xpath('//container-element[contains(text(),"Password is required.")]')
      .should("exist")
      .should("be.visible");
  }

  InvalidEmail() {
    return cy
      .xpath(
        '//container-element[contains(text()," Please enter a valid email address. ")]'
      )
      .should("exist")
      .should("be.visible");
  }
}

export default Login;
