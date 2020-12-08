// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('openMainPage', () => {
    cy.visit('http://localhost:3000')
})


Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(body))        
    })
})

Cypress.Commands.add('createBlog', ( blog ) => {
    cy.request({
        url: 'http://localhost:3001/api/blogs',
        method: 'POST',
        body: {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes
        },
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        }
    })
})


