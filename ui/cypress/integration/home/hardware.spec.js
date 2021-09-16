describe('Hardware Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/Hardware/')
    })
})

describe('Hardware Component', () => {
    it(`Should have a 'Search' bar`, () => {
        expect(cy.get('TextField').contains())
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

    it(`Should have a 'Remove' button`, () => {
        expect(cy.get('button').contains('Remove').should('exist'))
    })
})