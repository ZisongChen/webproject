describe('search', () => {
    it('passes', () => {
      cy.visit('http://localhost:3000/')
      cy.get('[href="/login"]').click()
      cy.get('#email').type("azz")
      cy.get('#password').type("zz")
      cy.get('[type="submit"]').click()
      cy.get('[href="/"]').click()
      cy.get('[href="/edit?postId=6403ccfaa636a2f54f64122d"]').click()
      cy.get('#title').type("www")
      cy.get('#word').type("www")
      cy.get('#edit').click()
    })
  })