describe('search', () => {
    it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get('li.next').click()
    cy.get('a > .next').click()
    cy.get('.prev').click()
})
})