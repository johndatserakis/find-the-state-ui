/// <reference types="cypress" />

describe('./pages/index.page.tsx', () => {
  it('should load the main index page', () => {
    cy.visit('http://localhost:3000/');

    cy.contains('Start Game').click();

    cy.get('h1').contains('Find the State');
    cy.get('h6').contains('Find this state:');
    cy.get('h6').contains('48 States Left');
    cy.get('button').contains('End Game');
  });
});

export {};
