describe('Personnel Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/Personnel/')
    })
})

describe('Personnel Component', () => {
    it(`Should have a 'Search' bar`, () => {
        expect(cy.get('TextField').contains('Search Tool ID').should('exist'))
    })

    it(`Should have a 'Search' bar`, () => {
        expect(cy.get('TextField').contains('Search Tool ID').should('exist'))
    })

    it(`Should have a 'Search' button`, () => {
        expect(cy.get('button').contains('SearchIcon').should('exist'))
    })

    it(`Should have a 'Add' button`, () => {
        expect(cy.get('button').contains('Add').should('exist'))
    })

    it(`Should have a 'Edit' button`, () => {
        expect(cy.get('button').contains('Edit').should('exist'))
    })

    it(`Should have a 'Remove' button`, () => {
        expect(cy.get('button').contains('Remove').should('exist'))
    })
})

describe('Add Tool Modal', () => {

    it(`Should have a 'Enter Hardware NSN' textfield`, () => {
        expect(cy.get('textfield').contains('Enter Hardware NSN').should('exist'))
    })

    it(`Should have a 'Enter Hardware PN' textfield`, () => {
        expect(cy.get('textfield').contains('Enter Hardware PN').should('exist'))
    })

    it(`Should have a 'Enter Hardware Quantity' textfield`, () => {
        expect(cy.get('textfield').contains('Enter Hardware Quantity').should('exist'))
    })

    it(`Should have a 'Descride Hardware' textfield`, () => {
        expect(cy.get('textfield').contains('Descride Hardware').should('exist'))
    })

    it(`Should have a 'Enter Hardware Storage Location' textfield`, () => {
        expect(cy.get('textfield').contains('Enter Hardware Storage Location').should('exist'))
    })

    it(`Should have a 'Enter Unit of Measure' textfield`, () => {
        expect(cy.get('textfield').contains('Enter Unit of Measure').should('exist'))
    })

    it(`Should have a 'Enter Quantity Low Threshold' textfield`, () => {
        expect(cy.get('textfield').contains('Enter Quantity Low Threshold').should('exist'))
    })

    it(`Should have a 'Enter Quantity Low Threshold' textfield`, () => {
        expect(cy.get('textfield').contains('Enter Quantity Low Threshold').should('exist'))
    })

    it(`Should have a 'Add New Hardware' button`, () => {
        expect(cy.get('button').contains('Add New Hardware').should('exist'))
    })

    it(`Add New Hardware button should be 'disabled' untill all fields are filled`, () => {
        expect(cy.get('button').contains('Add New Hardware').should('exist'))
    })
})