
describe('Search Functionality', () => {
  let eventPageData
  beforeEach(() => {
    cy.fixture('eventPage').then((eventData) => {
      eventPageData = eventData
    })
    cy.NavigateToEventLandingPage()
  })

  it.skip('Search using submission name', () => {
    cy.get('form').eq(1).type(eventPageData.name)
    cy.get('form > svg').eq(1).click()
    cy.wait(5000)
    cy.get('p.sc-gsDJrp.kJiLCV').then(($submission) => {
      const submissionCount = $submission.text()
      expect(parseInt(submissionCount)).to.eq(1)
    })
    cy.get('a > div > span').then(($name) => {
      const submissionName = $name.text()
      expect(submissionName).to.eq(eventPageData.name)
    }).click()
    cy.wait(10000)
    cy.get('div > h1 > span').contains(eventPageData.name, { timeout: 10000 }).should('be.visible')
  })

  it('Search using author name', () => {
    cy.get('form').eq(1).type(eventPageData.author)
    cy.get('form > svg').eq(1).click()
    cy.wait(5000)
    cy.get('p.sc-gsDJrp.kJiLCV').then(($submission) => {
      const submissionCount = $submission.text()
      expect(parseInt(submissionCount)).to.eq(1)
    })
    cy.get('div.sc-fWCJfs.kjawyH > p:nth-child(3)').then(($author) => {
      const authorName = $author.text()
      expect(authorName).to.eq(eventPageData.author + ' ')
    }).click()
    cy.wait(10000)
    cy.get('div > span > p').contains(eventPageData.author, { timeout: 5000 }).should('be.visible')
  })


})