describe('Hacker Stories', () => {
  const initialTerm = 'React'
  const newTerm = 'Cypress'

  context('Hitting the real API', () => {
    beforeEach(() => {
      cy.intercept({
<<<<<<< HEAD
        method: 'GET',
        pathname: '**/search',
=======
        method:'GET',
        pathname:'**/search',
>>>>>>> 6be1199b66e15ada616305964d76dc67c82b3db3
        query: {
          query: initialTerm,
          page: '0'
        }
      }).as('getStories')
<<<<<<< HEAD

      cy.visit('/')
      cy.wait('@getStories')
=======
      cy.visit('/')
  
      cy.wait('@getStories')
      
>>>>>>> 6be1199b66e15ada616305964d76dc67c82b3db3
    })

    it('shows 20 stories, then the next 20 after clicking "More"', () => {
      cy.intercept({
<<<<<<< HEAD
        method: 'GET',
        pathname: '**/search',
=======
        method:'GET',
        pathname:'**/search',
>>>>>>> 6be1199b66e15ada616305964d76dc67c82b3db3
        query: {
          query: initialTerm,
          page: '1'
        }
      }).as('getNextStories')
<<<<<<< HEAD

=======
>>>>>>> 6be1199b66e15ada616305964d76dc67c82b3db3
      cy.get('.item').should('have.length', 20)

      cy.contains('More').click()

      cy.wait('@getNextStories')

      cy.get('.item').should('have.length', 40)
    })
<<<<<<< HEAD

=======
>>>>>>> 6be1199b66e15ada616305964d76dc67c82b3db3
    it('searches via the last searched term', () => {
      cy.intercept(
        'GET',
        `**/search?query=${newTerm}&page=0`
      ).as('getNewTermStories')
<<<<<<< HEAD

=======
>>>>>>> 6be1199b66e15ada616305964d76dc67c82b3db3
      cy.get('#search')
        .clear()
        .type(`${newTerm}{enter}`)

      cy.wait('@getNewTermStories')

      cy.get(`button:contains(${initialTerm})`)
        .should('be.visible')
        .click()

      cy.wait('@getStories')

      cy.get('.item').should('have.length', 20)
      cy.get('.item')
        .first()
        .should('contain', initialTerm)
      cy.get(`button:contains(${newTerm})`)
        .should('be.visible')
    })
  })
<<<<<<< HEAD

  context('Mocking the API', () => {
    context('Footer and list of stories', () => {
      beforeEach(() => {
        cy.intercept(
          'GET',
          `**/search?query=${initialTerm}&page=0`,
          { fixture: 'stories' }
        ).as('getStories')

        cy.visit('/')
        cy.wait('@getStories')
      })

      it('shows the footer', () => {
        cy.get('footer')
          .should('be.visible')
          .and('contain', 'Icons made by Freepik from www.flaticon.com')
      })

      context('List of stories', () => {
        const stories = require('../fixtures/stories')

        it('shows the right data for all rendered stories', () => {
          cy.get('.item')
            .first()
            .should('be.visible')
            .and('contain', stories.hits[0].title)
            .and('contain', stories.hits[0].author)
            .and('contain', stories.hits[0].num_comments)
            .and('contain', stories.hits[0].points)
          cy.get(`.item a:contains(${stories.hits[0].title})`)
            .should('have.attr', 'href', stories.hits[0].url)

          cy.get('.item')
            .last()
            .should('be.visible')
            .and('contain', stories.hits[1].title)
            .and('contain', stories.hits[1].author)
            .and('contain', stories.hits[1].num_comments)
            .and('contain', stories.hits[1].points)
          cy.get(`.item a:contains(${stories.hits[1].title})`)
            .should('have.attr', 'href', stories.hits[1].url)
        })

        it('shows one story less after dimissing the first one', () => {
          cy.get('.button-small')
            .first()
            .click()

          cy.get('.item').should('have.length', 1)
        })

        context('Order by', () => {
          it('orders by title', () => {
            cy.get('.list-header-button:contains(Title)')
              .as('titleHeader')
              .should('be.visible')
              .click()

            cy.get('.item')
              .first()
              .should('be.visible')
              .and('contain', stories.hits[0].title)
            cy.get(`.item a:contains(${stories.hits[0].title})`)
              .should('have.attr', 'href', stories.hits[0].url)

            cy.get('@titleHeader')
              .click()

            cy.get('.item')
              .first()
              .should('be.visible')
              .and('contain', stories.hits[1].title)
            cy.get(`.item a:contains(${stories.hits[1].title})`)
              .should('have.attr', 'href', stories.hits[1].url)
          })

          it('orders by author', () => {
            cy.get('.list-header-button:contains(Author)')
              .as('authorHeader')
              .should('be.visible')
              .click()

            cy.get('.item')
              .first()
              .should('be.visible')
              .and('contain', stories.hits[0].author)

            cy.get('@authorHeader')
              .click()

            cy.get('.item')
              .first()
              .should('be.visible')
              .and('contain', stories.hits[1].author)
          })

          it('orders by comments', () => {
            cy.get('.list-header-button:contains(Comments)')
              .as('commentsHeader')
              .should('be.visible')
              .click()

            cy.get('.item')
              .first()
              .should('be.visible')
              .and('contain', stories.hits[1].num_comments)

            cy.get('@commentsHeader')
              .click()

            cy.get('.item')
              .first()
              .should('be.visible')
              .and('contain', stories.hits[0].num_comments)
          })

          it('orders by points', () => {
            cy.get('.list-header-button:contains(Points)')
              .as('pointsHeader')
              .should('be.visible')
              .click()

            cy.get('.item')
              .first()
              .should('be.visible')
              .and('contain', stories.hits[1].points)

            cy.get('@pointsHeader')
              .click()

            cy.get('.item')
              .first()
              .should('be.visible')
              .and('contain', stories.hits[0].points)
          })
        })
      })
    })

    context('Search', () => {
      beforeEach(() => {
        cy.intercept(
          'GET',
          `**/search?query=${initialTerm}&page=0`,
          { fixture: 'empty' }
        ).as('getEmptyStories')

        cy.intercept(
          'GET',
          `**/search?query=${newTerm}&page=0`,
          { fixture: 'stories' }
        ).as('getStories')

        cy.visit('/')
        cy.wait('@getEmptyStories')

        cy.get('#search')
          .clear()
      })

      it('shows no story when none is returned', () => {
        cy.get('.item').should('not.exist')
      })

      it('types and hits ENTER', () => {
        cy.get('#search')
          .type(`${newTerm}{enter}`)

        cy.wait('@getStories')

        cy.get('.item').should('have.length', 2)
        cy.get(`button:contains(${initialTerm})`)
          .should('be.visible')
      })

=======

  context('Mocking the API', () => {
    beforeEach(() => {
      cy.intercept(
        'GET',
        `**/search?query=${initialTerm}&page=0`,
        { fixture: 'stories'}
      ).as('getStories')
      cy.visit('/')
  
      cy.wait('@getStories')
      
    })
  
    it('shows the footer', () => {
      cy.get('footer')
        .should('be.visible')
        .and('contain', 'Icons made by Freepik from www.flaticon.com')
    })
  
    context('List of stories', () => {
      // Since the API is external,
      // I can't control what it will provide to the frontend,
      // and so, how can I assert on the data?
      // This is why this test is being skipped.
      // TODO: Find a way to test it out.
      it.skip('shows the right data for all rendered stories', () => {})
  
      it.only('shows one less story after dimissing the first story', () => {
        cy.get('.button-small')
          .first()
          .click()
  
        cy.get('.item').should('have.length', 1)
      })
  
      // Since the API is external,
      // I can't control what it will provide to the frontend,
      // and so, how can I test ordering?
      // This is why these tests are being skipped.
      // TODO: Find a way to test them out.
      context.skip('Order by', () => {
        it('orders by title', () => {})
  
        it('orders by author', () => {})
  
        it('orders by comments', () => {})
  
        it('orders by points', () => {})
      })
  
      // Hrm, how would I simulate such errors?
      // Since I still don't know, the tests are being skipped.
      // TODO: Find a way to test them out.
    })
  
    context('Search', () => {
      beforeEach(() => {
        cy.intercept(
          'GET',
          `**/search?query=${newTerm}&page=0`
        ).as('getNewTermStories')
        cy.get('#search')
          .clear()
      })
  
      it('types and hits ENTER', () => {
        cy.get('#search')
          .type(`${newTerm}{enter}`)
  
        cy.wait('@getNewTermStories')
  
        cy.get('.item').should('have.length', 20)
        cy.get('.item')
          .first()
          .should('contain', newTerm)
        cy.get(`button:contains(${initialTerm})`)
          .should('be.visible')
      })
  
>>>>>>> 6be1199b66e15ada616305964d76dc67c82b3db3
      it('types and clicks the submit button', () => {
        cy.get('#search')
          .type(newTerm)
        cy.contains('Submit')
          .click()
<<<<<<< HEAD

        cy.wait('@getStories')

        cy.get('.item').should('have.length', 2)
        cy.get(`button:contains(${initialTerm})`)
          .should('be.visible')
      })

      context('Last searches', () => {
        it('shows a max of 5 buttons for the last searched terms', () => {
          const faker = require('faker')

          cy.intercept(
            'GET',
            '**/search**',
            { fixture: 'empty' }
          ).as('getRandomStories')

=======
  
        cy.wait('@getNewTermStories')
  
        cy.get('.item').should('have.length', 20)
        cy.get('.item')
          .first()
          .should('contain', newTerm)
        cy.get(`button:contains(${initialTerm})`)
          .should('be.visible')
      })
  
      it('types and submits the form directly', () => {
        cy.get('form input[type="text"]')
          .should('be.visible')
          .clear()
          .type('cypress')
        cy.get('form').submit()
      })
  
      context('Last searches', () => {
        it('shows a max of 5 buttons for the last searched terms', () => {
          const faker = require('faker')
  
          cy.intercept(
            'GET',
            '**/search**'
          ).as('getRandomStories')
  
>>>>>>> 6be1199b66e15ada616305964d76dc67c82b3db3
          Cypress._.times(6, () => {
            cy.get('#search')
              .clear()
              .type(`${faker.random.word()}{enter}`)
            cy.wait('@getRandomStories')
          })
<<<<<<< HEAD

=======
  
          cy.assertLoadingIsShownAndHidden()
  
>>>>>>> 6be1199b66e15ada616305964d76dc67c82b3db3
          cy.get('.last-searches button')
            .should('have.length', 5)
        })
      })
    })
  })
})

context('Errors', () => {
  it('shows "Something went wrong ..." in case of a server error', () => {
    cy.intercept(
      'GET',
      '**/search**',
<<<<<<< HEAD
      { statusCode: 500 }
    ).as('getServerFailure')

    cy.visit('/')
    cy.wait('@getServerFailure')

    cy.get('p:contains(Something went wrong ...)')
=======
      {
        statusCode: 500
      }
    ).as('getServerFailure')
    cy.visit('/')
    cy.wait('@getServerFailure')

    cy.get('p:contains(Something went wrong)')
>>>>>>> 6be1199b66e15ada616305964d76dc67c82b3db3
      .should('be.visible')
  })

  it('shows "Something went wrong ..." in case of a network error', () => {
    cy.intercept(
      'GET',
      '**/search**',
<<<<<<< HEAD
      { forceNetworkError: true }
    ).as('getNetworkFailure')

    cy.visit('/')
    cy.wait('@getNetworkFailure')

    cy.get('p:contains(Something went wrong ...)')
      .should('be.visible')
  })
})
=======
      {
        forceNetworkError: true
      }
    ).as('getNewtworkFailure')
    cy.visit('/')
    cy.wait('@getNewtworkFailure')

    cy.get('p:contains(Something went wrong)')
      .should('be.visible')
  })
})
>>>>>>> 6be1199b66e15ada616305964d76dc67c82b3db3
