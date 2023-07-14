import { Cypress, cy, describe, it } from 'local-cypress';
import { loginViaZitadelUI } from '../support/commands.js';

describe('admin user can', () => {
  it('login with email and password', () => {
    loginViaZitadelUI(
      Cypress.env('TEST_ADMIN_EMAIL') as string,
      Cypress.env('TEST_ADMIN_PASSWORD') as string,
    );
  });

  it('view dashboard', () => {
    cy.login(
      Cypress.env('TEST_ADMIN_EMAIL') as string,
      Cypress.env('TEST_ADMIN_PASSWORD') as string,
    );
    cy.visit('/dashboard/exam-requests');
    cy.get('nav').should('be.visible');
  });

  it('logout', () => {
    cy.login(
      Cypress.env('TEST_ADMIN_EMAIL') as string,
      Cypress.env('TEST_ADMIN_PASSWORD') as string,
    );
    cy.visit('/dashboard/exam-requests');
    cy.contains('Sign Out').click();
    cy.location('pathname').should('eq', '/');
  });
});
