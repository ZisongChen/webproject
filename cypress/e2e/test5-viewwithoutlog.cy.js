describe('search', () => {
    it('passes', () => {
      cy.visit('http://localhost:3000/')
      cy.get('[href="/comments?postId=6403cceaa636a2f54f64122a"]').click()
      cy.get('[href="/"]').click()
    })
  })
