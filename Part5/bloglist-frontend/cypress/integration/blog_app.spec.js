describe('Blog app', function () {

    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Damon Hill',
            username: 'dhill',
            password: 'secret'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
    })

    it('front page can be opened and contains login form', function () {
        cy.visit('http://localhost:3000')
        cy.contains('blogs')
        cy.contains('login')
    })

    describe('Login', function () {
        this.beforeEach(function () {
            cy.visit('http://localhost:3000')
        })

        it('user can login successfully', function () {
            cy.contains('login').click()
            cy.get('#username').type('dhill')
            cy.get('#password').type('secret')
            cy.get('#login-button').click()
            cy.contains('Damon Hill logged-in')
        })

        it('user cannot login with wrong username', function () {
            cy.contains('login').click()
            cy.get('#username').type('incorrect')
            cy.get('#password').type('secret')
            cy.get('#login-button').click()
            cy.get('.error')
                .should('contain', 'Wrong credentials')
                .and('have.css', 'color', 'rgb(255, 255, 255)')
                .and('have.css', 'background-color', 'rgb(255, 0, 0)')
            cy.get('html').should('not.contain', 'Damon Hill logged-in')
        })

        it('user cannot login with wrong password', function () {
            cy.contains('login').click()
            cy.get('#username').type('dhill')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
            cy.get('.error')
                .should('contain', 'Wrong credentials')
                .and('have.css', 'color', 'rgb(255, 255, 255)')
                .and('have.css', 'background-color', 'rgb(255, 0, 0)')
            cy.get('html').should('not.contain', 'Damon Hill logged-in')
        })

    })

    describe('Add new blog', function () {

        this.beforeEach(function () {
            cy.login({ username: 'dhill', password: 'secret' })
            cy.openMainPage()
        })

        it('user can add a new blog', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('Adding the title')
            cy.get('#author').type('mr perfect')
            cy.get('#url').type('www.thiswillwork.com')
            cy.get('#submit-button').click()
            cy.get('.notification')
                .should('contain', 'successfully added')
            cy.contains('Adding the title mr perfect')
        })
    })

    describe('Working with the blog list', function () {

        this.beforeEach(function () {
            const blog1 = {
                title: 'Most liked blog',
                author: 'Melady Popular',
                url: 'www.google.com',
                likes: 10
            }

            const blog2 = {
                title: 'Least liked blog',
                author: 'Mr Wannabe',
                url: 'www.google.com',
                likes: 2
            }
            const blog3 = {
                title: 'Second most liked blog',
                author: 'Mr Mediocre',
                url: 'www.google.com',
                likes: 5
            }
            cy.login({ username: 'dhill', password: 'secret' })
            cy.createBlog(blog1)
            cy.createBlog(blog2)
            cy.createBlog(blog3)
            cy.openMainPage()
        })

        it('user can like a new blog', function () {
            cy.contains('Second most liked blog')
                .contains('Show').click()
            cy.contains('Second most liked blog').parent().find('[data-cy=like]').click()

            cy.contains('Second most liked blog').parent().contains(6)
        })

        it('user can delete a blog', function () {
            cy.contains('Second most liked blog')
                .contains('Show').click()
            cy.contains('Second most liked blog').parent().find('[data-cy=remove]').click()
            cy.get('html').should('not.contain', 'Second most liked blog')
        })

        it('user cannot delete some else blog', function () {
            const user2 = {
                name: 'Willem van Oranje',
                username: 'willem',
                password: 'willem'
            }
            cy.request('POST', 'http://localhost:3001/api/users/', user2)
            cy.contains('logout').click
            cy.login({ username: 'willem', password: 'willem' })
            cy.openMainPage()

            cy.contains('Second most liked blog')
                .contains('Show').click()
            cy.contains('Second most liked blog').parent().find('[data-cy=remove]').click()
            cy.contains('Second most liked blog')

        })

        it('list is sorted correctly', function () {
            cy.get('.blog-collapse').first().contains('Most liked blog')
            cy.get('.blog-collapse').last().contains('Least liked blog')
        })
    })
})




