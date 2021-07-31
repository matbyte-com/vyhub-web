// https://docs.cypress.io/api/introduction/api.html

describe('Home Page Tests', () => {
  it('Creates a new Message', () => {
    cy.login();
    cy.get('[data-cy=new-message-button]').click();
  });
});
