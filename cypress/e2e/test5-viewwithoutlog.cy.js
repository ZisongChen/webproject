describe('search', () => {
    it('passes', () => {
      cy.visit('http://localhost:3000/')
      cy.get('[href="/comments?postId=6403b78e82b961548b70213a"]').click()
      cy.get('[href="/"]').click()
    })
  })