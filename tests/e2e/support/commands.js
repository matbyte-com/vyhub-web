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
Cypress.Commands.add('login', () => {
  cy.visit('http://localhost:8050');

  cy.get('[data-cy=login-button]').click();
  cy.url().should('include', '?login');
  cy.get('[data-cy=vyhub_central]').click();
  cy.get('[data-cy=email-input]').type('test@ibot3.de');
  cy.get('[data-cy=password-input]').type('123');
  cy.contains('Continue').click();
  cy.contains('Confirm').click();
});
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
