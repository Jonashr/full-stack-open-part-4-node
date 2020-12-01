// Finds the sum of likes of all the blog posts

const totalLikes = require('../utils/list_helper').totalLikes

describe('When the list of blogs are empty', () => {
  const emptyList = []
  test('The total likes should be equal to 0', () => {
    const result = totalLikes(emptyList)
    expect(result).toBe(0)
  })
})

describe('When there is only one blog by one author', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('Total likes will be the same as the likes of that blog', () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('When there is a list of three blogs', () => {
  const listWithThreeBlogs = [
    {
      _id: '123',
      title: 'Blog 1',
      author: 'Author 1',
      url: 'http://url.com/1/',
      likes: 3
    },
    {
      _id: '1234',
      title: 'Blog 2',
      author: 'Author 2',
      url: 'http://url.com/2/',
      likes: 13
    },
    {
      _id: '12345',
      title: 'Blog 3',
      author: 'Author 3',
      url: 'http://url.com/2/',
      likes: 273
    }
  ]

  test('Returns the sum of likes of all three blogs', () => {
    const result = totalLikes(listWithThreeBlogs)
    expect(result).toBe(listWithThreeBlogs[0].likes + listWithThreeBlogs[1].likes + listWithThreeBlogs[2].likes)
  })

})
