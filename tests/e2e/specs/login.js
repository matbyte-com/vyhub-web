describe('Check if login is workin', () => {
  it('Visits Homepage', () => {
    cy.visit('http://nyx.devapp:8050');

    cy.contains('login').click();
    cy.url().should('include', '?login');
  });
});
