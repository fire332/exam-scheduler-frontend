/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
import { cy, Cypress } from 'local-cypress';

declare global {
  namespace Cypress {
    interface Chainable {
      login: typeof loginToZitadelCommand;
    }
  }
}

export function loginViaZitadelUI(username: string, password: string) {
  cy.visit('/');
  cy.get('button').contains('SIGN IN').click();

  cy.origin(
    import.meta.env.VITE_OIDC_AUTHORITY,
    { args: { username, password } },
    ({ username, password }) => {
      cy.get('input[name=loginName]').type(username);
      cy.get('button[type=submit]').click();
      cy.get('input[name=password]').type(password);
      cy.get('button[type=submit]').click();
    },
  );

  cy.location('origin').should('eq', Cypress.config('baseUrl'));
}

const loginToZitadelCommand = (username: string, password: string) => {
  const log = Cypress.log({
    displayName: 'ZITADEL LOGIN',
    message: [`🔐 Authenticating | ${username}`],
    autoEnd: false,
  });
  log.snapshot('before');

  cy.session(
    `zitadel-${username}`,
    () => loginViaZitadelUI(username, password),
    {
      validate: () => {
        cy.wrap(sessionStorage)
          .invoke(
            'getItem',
            `oidc.user:${import.meta.env.VITE_OIDC_AUTHORITY}:${
              import.meta.env.VITE_OIDC_CLIENTID
            }`,
          )
          .should('exist');
      },
    },
  );

  log.snapshot('after');
  log.end();
};

Cypress.Commands.add('login', loginToZitadelCommand);
