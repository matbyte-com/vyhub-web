// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits Homepage', () => {
    cy.visit('http://localhost:8050');
    cy.contains('h1', 'Welcome to Your Vue.js + TypeScript App');
  });
});

describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });
});
