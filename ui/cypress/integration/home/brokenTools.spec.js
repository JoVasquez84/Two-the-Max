describe('Broken Tools Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/IssuedTools/')
    })
})

describe('Broken Tools Component', () => {
    it(`Should have a 'Search' bar`, () => {
        expect(cy.get('TextField').contains('Search Tool ID').should('exist'))
    })

    it(`Should have a 'Search' bar`, () => {
        expect(cy.get('TextField').contains('Search Tool ID').should('exist'))
    })

    it(`Should have a search 'button'`, () => {
        expect(cy.get('button').contains('SearchIcon').should('exist'))
    })
})