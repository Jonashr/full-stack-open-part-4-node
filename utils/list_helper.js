const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = blogs.reduce((accumulated, blog) => {
        return accumulated + blog.likes
    }, 0)

    return sum
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) {
        return null
    }


    let favBlog = blogs.reduce((currentMost, blog) => {
        if(currentMost.likes < blog.likes) {
            return blog
        } else {
            return currentMost
        }
    }, blogs[0])

    return favBlog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}

