///<reference types="cypress"/>
import DefaultFilter from "../../support/page-object/defaultFilter/defaultFilter.po";
describe("Default filter", () => {
  const defaultfilter = new DefaultFilter();

  let ecpectedData = "";
  let filterdata = "";

  beforeEach(() => {
    cy.Login();
    cy.visit("");
  });

  it("Validating default filter of each modules exists", () => {
    cy.fixture("filter").then((filter) => {
      let filter_test = filter.length;

      defaultfilter.SideBar().each(($ea, index, $list) => {
        for (let i = 0; i < filter_test; i++) {
          if (
            $ea.text().trim().replaceAll(/[\n]/g, "").toLowerCase() ===
            filter[i].module.toLowerCase()
          ) {
            defaultfilter.SideBar().eq(index).click();
            cy.url().should("contain", filter[i].url);
            defaultfilter.Filter().each(($ea1, index2, $list1) => {
              for (let j = 0; j < filter[i].fields.length; j++) {
                if (
                  $ea1.text().trim().replaceAll(/[\n]/g, "").toLowerCase() ===
                  filter[i].fields[j].toLowerCase()
                ) {
                  filterdata = $ea1.text().trim().toLowerCase();
                  ecpectedData = filter[i].fields[j].toLowerCase();
                  expect(filterdata).to.eq(ecpectedData);
                }
              }
            });
            break;
          }
        }
      });
    });
  });
});
