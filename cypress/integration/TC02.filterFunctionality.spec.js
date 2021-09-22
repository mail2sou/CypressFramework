describe('Filter and Clear Filter Functionality', () => {
    let eventPageData
    beforeEach(() => {
        cy.fixture('eventPage').then((eventData) => {
            eventPageData = eventData
        })
        cy.NavigateToEventLandingPage()
    })

    afterEach(() => {
        //test clear filter
        cy.get('div.style__SearchAndFiltersContainer-sc-1fffutc-9.ibZvNQ > button > span').click()
        cy.findByText('Clear all filters').click()
        cy.findByText('Close').click()
        cy.wait(5000)
        cy.findByText(eventPageData.totalSubmissionCount).should('be.visible')
    })

    it('Filter using a keyword', () => {
        let filterCount
        cy.findByText('Add filter').click()
        cy.findByText(eventPageData.keywordFilter).click()
        cy.wait(7000)
        cy.findAllByText(eventPageData.keywordFilter).eq(1).parent().children('span.sc-gsDJrp.fbXlhZ').then(($filter) => {
            filterCount = $filter.text()
            filterCount = filterCount.match(/\d+/)[0]
            cy.log(filterCount)
        })
        cy.findByText('Close').click()
        cy.wait(5000)
        cy.get('div:nth-child(3) > p').then(($submission) => {
            let submissionCount = $submission.text()
            submissionCount = submissionCount.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').match(/\d+/)[0]
            cy.log(submissionCount)
            expect(submissionCount).to.eq(filterCount)
        })
    })

    it('Filter using a organizations', () => {
        let filterCount
        cy.findByText('Add filter').click()
        cy.findByText('Keywords').click()
        cy.findByText('Organizations').click()
        cy.findAllByPlaceholderText('Search for organizations').type(eventPageData.organizationFilter)
        cy.wait(5000)
        cy.get('div.MuiCollapse-container.MuiCollapse-entered > div > div > div > div > div.MuiButtonBase-root.MuiListItem-root.MuiListItem-gutters.MuiListItem-button > div').click()
        cy.wait(5000)
        cy.get('div.MuiCollapse-container.MuiCollapse-entered > div > div > div > div > div.MuiButtonBase-root.MuiListItem-root.MuiListItem-gutters.MuiListItem-button > div').parent().children('span.sc-gsDJrp.fbXlhZ').then(($filter) => {
            filterCount = $filter.text()
            filterCount = filterCount.match(/\d+/)[0]
            cy.log(filterCount)
        })
        cy.findByText('Close').click()
        cy.wait(5000)
        cy.get('div:nth-child(3) > p').then(($submission) => {
            let submissionCount = $submission.text()
            submissionCount = submissionCount.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').match(/\d+/)[0]
            cy.log(submissionCount)
            expect(submissionCount).to.eq(filterCount)
        })
    })

})