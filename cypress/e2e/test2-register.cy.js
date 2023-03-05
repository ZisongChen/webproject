describe('search', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[href="/register"]').click()
    cy.get('#email').type("aazz")
    cy.get('#password').type("zz")
    cy.get('#register').click()
  })
})
