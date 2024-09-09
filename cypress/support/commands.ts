Cypress.Commands.add('getDataTest', (selector: string) => {
    return cy.get(`[data-test=${selector}]`);
});