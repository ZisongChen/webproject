describe('search', () => {
    it('passes', () => {
      cy.visit('http://localhost:3000/')
      cy.get('[href="/login"]').click()
      cy.get('#email').type("admin")
      cy.get('#password').type("admin")
      cy.get('[type="submit"]').click()
      cy.get('[href="/"]').click()
      cy.get(':nth-child(3) > div > button.MuiButtonBase-root').click()
    })
  })