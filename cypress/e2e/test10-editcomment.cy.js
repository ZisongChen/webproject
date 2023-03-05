describe('search', () => {
    it('passes', () => {
      cy.visit('http://localhost:3000/')
      cy.get('[href="/login"]').click()
      cy.get('#email').type("azz")
      cy.get('#password').type("zz")
      cy.get('[type="submit"]').click()
      cy.get('[href="/"]').click()
      cy.get('[href="/comments?postId=6403cceaa636a2f54f64122a"]').click()
      cy.get(':nth-child(3) > div > a.MuiButtonBase-root').click()
      cy.get('#word').type("ss")

      cy.get('#edit').click()
    })
  })
