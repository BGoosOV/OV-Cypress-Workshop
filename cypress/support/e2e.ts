// cypress/support/e2e.ts
function loginViaAAD(username: string, password: string) {
    cy.visit('https://intresoview-test.descroes.be/')
  
    // Login to your AAD tenant.
    cy.origin(
      'login.microsoftonline.com',
      {
        args: {
          username,
        },
      },
      ({ username }) => {
        cy.get('input[type="email"]').type(username, {
          log: false,
        })
        cy.get('input[type="submit"]').click()
      }
    )
  
    // depending on the user and how they are registered with Microsoft, the origin may go to live.com
    cy.origin(
      'login.microsoftonline.com',
      {
        args: {
          password,
        },
      },
      ({ password }) => {
        cy.get('input[type="password"]').type(password, {
          log: false,
        })
        cy.get('input[type="submit"]').click()
        cy.get('#idBtn_Back').click()
      }
    )
  
    // Ensure Microsoft has redirected us back to the sample app with our logged in user.
    cy.url().should('equal', 'https://intresoview-test.descroes.be/')
    cy.get('.gebruiker-name').should(
      'contain',
      `${Cypress.env('aad_name')}`
    )
  }
  
  Cypress.Commands.add('loginToAAD', (username: string, password: string) => {
    cy.session(
      `aad-${username}`,
      () => {
        const log = Cypress.log({
          displayName: 'Azure Active Directory Login',
          message: [`🔐 Authenticating | ${username}`],
          autoEnd: false,
        })
  
        log.snapshot('before')
  
        loginViaAAD(username, password)
  
        log.snapshot('after')
        log.end()
      },
      {
        cacheAcrossSpecs: true
      }
    )
  })
