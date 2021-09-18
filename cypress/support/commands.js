import '@testing-library/cypress/add-commands'
Cypress.Commands.add("NavigateToEventLandingPage",() => {
    cy.visit('/acsspring2020expo/5e733c5acde2b641284a7e27')
    cy.title().should('eq', 'ACS Spring 2020 National Meeting & Expo | Morressier')
    cy.location('protocol').should('eq','https:')
})