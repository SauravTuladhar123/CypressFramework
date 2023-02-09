/// <reference types="cypress"/>

class DefaultFilter {
  SideBar() {
    return cy.xpath('//a[@role="sidebar-navigation"]').should("exist");
  }

  Filter() {
    return cy.xpath(
      '//input["@qobrix-dynamic-schema-filter"]//following::label'
    );
  }
}
export default DefaultFilter;
