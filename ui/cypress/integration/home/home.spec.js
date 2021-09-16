describe('Issued Tools Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/IssuedTools'),
        cy.viewport(1280, 720)
    })

    it(`Should have a button for 'Issued Tools' Component`, () => {
        expect(cy.findByRole('button').contains('Issued Tools').should('exist'))
    })
/*
    it (`should navigate to the url '/IssuedTools/' when the user clicks the 'Issued Tools' button`, () => {
        return cy.get('button').contains('Issued Tools').click()
            .then(() => {
                cy.url().should('eq', 'http://localhost:3000/IssuedTools/')
            })
    });
    
    it(`Should have a button for 'All Tools' Component`, () => {
        expect(cy.get('button').contains('All Tools').should('exist'))
    })

    it (`should navigate to the url '/AllTools/' when the user clicks the 'All Tools' button`, () => {
        return cy.get('button').contains('All Tools').click()
            .then(() => {
                cy.url().should('eq', 'http://localhost:3000/AllTools/')
            })
    });
    
    it(`Should have a button for 'Personnel' Component`, () => {
        expect(cy.get('button').contains('Personel').should('exist'))
    })

    it (`should navigate to the url '/Personnel/' when the user clicks the 'Personnel' button`, () => {
        return cy.get('button').contains('Personnel').click()
            .then(() => {
                cy.url().should('eq', 'http://localhost:3000/Personnel/')
            })
    });

    it(`When page is smaller than '1280' should have a 'menu' that drops down a list of links to the other pages`, () => {
        expect(cy.get('menu').contains('Issued Tools', 'All Tools', 'Personel').should('exist'))
    })

    it(`Should have a 'Search' bar`, () => {
        expect(cy.get('TextField').contains())
    })

    it(`Should have a search 'button'`, () => {
        expect(cy.get('button').contains('SearchIcon').should('exist'))
    })

    it(`Should have a 'Transfer Tools' button`, () => {
        expect(cy.get('button').contains('Transfer Tools').should('exist'))
    })

    it(`Should have a 'Transfer Tools' button`, () => {
        expect(cy.get('button').contains('Transfer Tools').should('exist'))
    })

    it(`Should have a 'NSN' textfield`, () => {
        expect(cy.get('textfield').contains('NSN').should('exist'))
    })

    it(`Should have a 'NSN' textfield`, () => {
        expect(cy.get('textfield').contains('NSN').should('exist'))
    })
*/
})
/*
describe('Issued Tools Page', () => {
    it(`Should have a button for 'Issued Tools' Component`, () => {
        expect(cy.get('button').contains('Issued Tools').should('exist'))
    })

    it (`should navigate to the url '/IssuedTools/' when the user clicks the 'Issued Tools' button`, () => {
        return cy.get('button').contains('Issued Tools').click()
            .then(() => {
                cy.url().should('eq', 'http://localhost:3000/IssuedTools/')
            })
    });
    
    it(`Should have a button for 'All Tools' Component`, () => {
        expect(cy.get('button').contains('All Tools').should('exist'))
    })

    it (`should navigate to the url '/AllTools/' when the user clicks the 'All Tools' button`, () => {
        return cy.get('button').contains('All Tools').click()
            .then(() => {
                cy.url().should('eq', 'http://localhost:3000/AllTools/')
            })
    });
    
    it(`Should have a button for 'Personnel' Component`, () => {
        expect(cy.get('button').contains('Personel').should('exist'))
    })

    it (`should navigate to the url '/Personnel/' when the user clicks the 'Personnel' button`, () => {
        return cy.get('button').contains('Personnel').click()
            .then(() => {
                cy.url().should('eq', 'http://localhost:3000/Personnel/')
            })
    });

    it(`When page is smaller than '1280' should have a 'menu' that drops down a list of links to the other pages`, () => {
        expect(cy.get('menu').contains('Issued Tools', 'All Tools', 'Personel').should('exist'))
    })
})

describe('Issued Tools Component', () => {
    it(`Should have a 'Search' bar`, () => {
        expect(cy.get('TextField').contains())
    })

    it(`Should have a search 'button'`, () => {
        expect(cy.get('button').contains('SearchIcon').should('exist'))
    })

    it(`Should have a 'Transfer Tools' button`, () => {
        expect(cy.get('button').contains('Transfer Tools').should('exist'))
    })
})

describe('Transfer Tools Modal', () => {

    it(`Should have a 'Transfer Tools' button`, () => {
        expect(cy.get('button').contains('Transfer Tools').should('exist'))
    })

    it(`Should have a 'NSN' textfield`, () => {
        expect(cy.get('textfield').contains('NSN').should('exist'))
    })

    it(`Should have a 'NSN' textfield`, () => {
        expect(cy.get('textfield').contains('NSN').should('exist'))
    })
})
*/