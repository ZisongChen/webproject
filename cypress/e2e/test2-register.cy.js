describe('search', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[href="/register"]').click()
    
    cy.get('#register').click()
  })
})