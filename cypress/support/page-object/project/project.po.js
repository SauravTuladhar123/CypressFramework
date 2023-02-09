/// <reference types="cypress"/>

class Projects {
    ProjectSideBar() {
      return cy
        .xpath('//a[@title="Projects"]')
        .should("exist")
        .should("be.visible");
    }

    ValidateProjectSlider() {
        return cy
          .contains("span", " Create a new Project")
          .should("exist")
          .should("be.visible");
      }

      ProjectName() {
        return cy
          .xpath('(//label[contains(text(),"Name")])[1]//preceding::input[1]')
          .should("exist");
      }

      ValidateProjectName() {
        return cy
          .xpath('(//div[contains(text(),"Automation project")])[1]')
          //.should("exist");
      }

      SelectCreatedProject() {
        return cy
          .xpath('(//div[contains(text(),"Automation project")])[1]//preceding::img[1]')
          //.should("exist");
      }
}
export default Projects;