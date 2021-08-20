describe('All Tools Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/AllTools/')
    })
})

describe('All Tools Component', () => {
    it(`Should have a 'Search' bar`, () => {
        expect(cy.get('TextField').contains('Search Tool ID / Name').should('exist'))
    })

    it(`Should have a 'Search' bar`, () => {
        expect(cy.get('TextField').contains('Search Tool ID / Name').should('exist'))
    })

    it(`Should have a search 'button'`, () => {
        expect(cy.get('button').contains('SearchIcon').should('exist'))
    })

    it(`Should have an 'Add' button`, () => {
        expect(cy.get('button').contains('Add').should('exist'))
    })

    it(`Should have an 'Edit' button`, () => {
        expect(cy.get('button').contains('Edit').should('exist'))
    })

    it(`Should have an 'Checkout' button`, () => {
        expect(cy.get('button').contains('Checkout').should('exist'))
    })

    it(`Should have an 'Checkin' button`, () => {
        expect(cy.get('button').contains('Checkin').should('exist'))
    })

    it(`Should have an 'Remove' button`, () => {
        expect(cy.get('button').contains('Remove').should('exist'))
    })
})