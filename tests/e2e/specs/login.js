describe('Check if login is working', () => {
  it('Visits Homepage', () => {
    cy.visit('http://localhost:8050');

    cy.get('[data-cy=login-button]').click();
    cy.url().should('include', '?login');
    cy.get('[data-cy=vyhub_central]').click();
    cy.get('[data-cy=email-input]').then(() => {
      cy.get('[data-cy=email-input]').type('test@ibot3.de');
      cy.get('[data-cy=password-input]').type('123');
    });
    cy.contains('Continue').click();
    cy.contains('Confirm').click();
  });
});
