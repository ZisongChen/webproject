describe('search', () => {
    it('passes', () => {
      cy.visit('http://localhost:3000/')
      cy.get('[href="/login"]').click()
      cy.get('#email').type("azz")
      cy.get('#password').type("zz")
      cy.get('[type="submit"]').click()
      cy.get('[href="/"]').click()
      cy.get('#title').type("azz")
      cy.get('#word').type("azz")
      cy.get('#language').select("python")
      cy.get('#post').click()
    })
  })