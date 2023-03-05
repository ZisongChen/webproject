describe('search', () => {
    it('passes', () => {
      cy.visit('http://localhost:3000/')
      cy.get('[href="/login"]').click()
      cy.get('#email').type("azz")
      cy.get('#password').type("zz")
      cy.get('[type="submit"]').click()
      cy.get('[href="/"]').click()
      cy.get('[href="/comments?postId=6403b78e82b961548b70213a"]').click()
      cy.get(':nth-child(4) > div > a.MuiButtonBase-root').click()
      cy.get('#word').type("zz")
      cy.get('#edit').click()
    })
  })