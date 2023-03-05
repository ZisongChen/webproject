describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[href="/Search"]').click()
    cy.get('#word').type("z")
    cy.get('.MuiContainer-root > .MuiButtonBase-root').click()
  })
})