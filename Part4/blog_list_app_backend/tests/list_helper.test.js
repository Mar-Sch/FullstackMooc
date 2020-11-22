const listHelper = require('../utils/list_helper')
const blogData = require('./test_data')


describe('smoke', () => {
    test('dummy returns one', () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
})

describe('total likes', () => {

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(blogData.listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogData.listWithMoreBlogs)
        expect(result).toBe(36)
    })

})

describe('Favorit Blog', () => {
 
    test('returns favorite blog', () => {
        const result = listHelper.favoriteBlog(blogData.listWithMoreBlogs)
        expect(result.title).toEqual("Canonical string reduction")
        expect(result.Author).toEqual("Edsger W. Dijkstra")
        expect(result.likes).toBe(12)
    })

})