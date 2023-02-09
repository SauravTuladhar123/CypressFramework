/// <reference types="cypress"/>

import Login from "../../support/page-object/login/login.po";
import Properties from "../../support/page-object/properties/properties.po";
describe("Login Module", () => {
  const login = new Login();
  const properties = new Properties();

  const username = Cypress.env("username");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("");
    cy.url().should("eq", Cypress.config("baseUrl") + "/login?returnUrl=%2F");
  });

  // Valid login test case
  it("Valid login test scenario", () => {
    cy.fixture("userdata").then((data) => {
      login.Username().type(username);
      login.Password().type(password);
      login.LoginBtn().click();
      cy.url().should(
        "eq",
        Cypress.config("baseUrl") +
          "/crm/properties?page=1&limit=15&sort=-Properties.created"
      );
      properties.PropertyHead().should("contain.text", "Properties");
    });
  });

  // Invalid login test cases
  it("Invalid username with invalid password scenario", () => {
    cy.fixture("userdata").then((data) => {
      login.Username().type(data.invalid_userdata[1].username);
      login.Password().type(data.invalid_userdata[1].password);
      login.LoginBtn().click();
      login
        .ToastMessage()
        .should("contain.text", "Invalid username or password");
    });
  });

  it("Valid username with invalid password scenario", () => {
    cy.fixture("userdata").then((data) => {
      login.Username().type(username);
      login.Password().type(data.invalid_userdata[1].password);
      login.LoginBtn().click();
      login
        .ToastMessage()
        .should("contain.text", "Invalid username or password");
    });
  });

  it("Valid password with invalid username scenario", () => {
    cy.fixture("userdata").then((data) => {
      login.Username().type(data.invalid_userdata[1].username);
      login.Password().type(password);
      login.LoginBtn().click();
      login
        .ToastMessage()
        .should("contain.text", "Invalid username or password");
    });
  });

  it("Password and username both empty scenario", () => {
    cy.fixture("userdata").then((data) => {
      login.Username().focus().blur();
      login.Password().focus().blur();
      login.LoginBtn().click();
      login
        .EmailRequired()
        .should("contain.text", " Email address or username is required. ");
    });
  });

  it("Valid password and username empty scenario", () => {
    cy.fixture("userdata").then((data) => {
      login.Username().focus().blur();
      login.Password().type(password);
      login.LoginBtn().click();
      login
        .EmailRequired()
        .should("contain.text", " Email address or username is required. ");
    });
  });

  it("Empty password and valid username empty scenario", () => {
    cy.fixture("userdata").then((data) => {
      login.Username().type(username);
      login.Password().focus().blur();
      login.LoginBtn().click();
      login.PasswordRequired().should("contain.text", "Password is required.");
    });
  });

  it("Invalid Email scenario", () => {
    cy.fixture("userdata").then((data) => {
      login.Username().type("test");
      login.Password().type(password);
      login.LoginBtn().click();
      login
        .InvalidEmail()
        .should("contain.text", " Please enter a valid email address. ");
    });
  });
});
