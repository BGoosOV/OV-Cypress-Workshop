declare namespace Cypress {
    interface Chainable {
        loginToAAD(username: string, paswword: string),
        getDataTest(selector: string)
    }
  }