const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const numberOfLikes = blogs.reduce((sum, x) => sum + x.likes, 0)
   
    return numberOfLikes
}


const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)

    return {
        "title": favorite.title,
        "Author": favorite.author,
        "likes": favorite.likes
    }        
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}