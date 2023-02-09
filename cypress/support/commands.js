// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/* import Login from "./page-object/login/login.po";
import Properties from "./page-object/properties/properties.po";
Cypress.Commands.add("Login", () => {
  const login = new Login();
  const properties = new Properties();
  cy.visit("");
  cy.url({ timeout: 20000 }).should(
    "eq",
    Cypress.config("baseUrl") + "/login?returnUrl=%2F"
  );
  cy.fixture("userdata").then((data) => {
    login.Username().type(data.valid_userdata[0].username);
    login.Password().type(data.valid_userdata[0].password);
    login.LoginBtn().click();
    cy.url({ timeout: 20000 }).should(
      "eq",
      Cypress.config("baseUrl") +
        "/crm/properties?page=1&limit=15&sort=-Properties.created"
    );
    properties.PropertyHead().should("contain.text", "Properties");
  });
}); */

Cypress.Commands.add("Login", ({ cacheSession = true } = {}) => {
  const newTokenRequest = () => {
    cy.request({
      method: "POST",
      url: "/api/v2/session",
      body: {
        username: Cypress.env("username"),
        password: Cypress.env("password"),
      },
    })
      .as("newTokenRequest")
      .then(({ body }) => {
        let expiresOn = new Date();
        expiresOn.setSeconds(expiresOn.getSeconds() + body.expires_in);

        Cypress.env("expiresOn", expiresOn.getTime().toString());
        Cypress.env("accessToken", body.access_token);
        Cypress.env("refreshToken", body.refresh_token);
      });
  };

  const refreshTokenRequest = () => {
    cy.request({
      method: "POST",
      url: "/api/v2/session/token",
      body: {
        refresh_token: Cypress.env("refreshToken"),
      },
    })
      .as("refreshTokenRequest")
      .then(({ body }) => {
        let expiresOn = new Date();
        expiresOn.setSeconds(expiresOn.getSeconds() + body.expires_in);

        Cypress.env("expiresOn", expiresOn.getTime().toString());
        Cypress.env("accessToken", body.access_token);
      });
  };

  if (cacheSession) {
    let tokenExist = false;
    let accessToken = Cypress.env("accessToken") || false;
    let expiresOn = Cypress.env("expiresOn") || false;

    if (accessToken && expiresOn) {
      tokenExist = true;
    }

    if (tokenExist) {
      const tokenExpired =
        Cypress.env("expiresOn") <= new Date().getTime() - 30;
      if (!tokenExpired) {
        cy.log("Token not expired > no request for login");
        newTokenRequest();
        return;
      } else {
        cy.log("Token expired > refreshTokenRequest");
        //newTokenRequest();
        refreshTokenRequest();
      }
    } else {
      cy.log("No token exist > newTokenRequest");
      newTokenRequest();
    }
  } else {
    cy.log("Always > newTokenRequest");
    newTokenRequest();
  }
});

Cypress.Commands.add("setSystemSetting", (property, value) => {
  cy.Login().then(() => {
    cy.request({
      url: "/api/v2/settings/system/" + property,
      method: "POST",
      headers: {
        authorization: "Bearer " + Cypress.env("accessToken"),
      },
      body: {
        value: value,
      },
    })
      .as("setSystemSettingResponse")
      .its("status")
      .should("eq", 200);
  });
});

Cypress.Commands.add("getSystemSetting", (property) => {
  cy.Login().then(() => {
    cy.request({
      url: "/api/v2/settings/system/" + property,
      method: "GET",
      headers: {
        authorization: "Bearer " + Cypress.env("accessToken"),
      },
    })
      .as("getSystemSettingResponse")
      .then(({ body }) => {
        return body.data.value;
      });
  });
});
