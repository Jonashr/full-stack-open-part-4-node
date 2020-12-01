const mostBlogs = require('../utils/list_helper').mostBlogs

describe('When there is an empty blog list', () => {
  const emptyBlogList = []

  test('Returns no name and 0', () => {
    const result = mostBlogs(emptyBlogList)
    expect(result.author).toBe('')
    expect(result.blogs).toBe(0)
  })
})

describe('When there is only a single blog', () => {
  const listWithOneBlog = [
    {
      _id: '123',
      title: 'Blog 1',
      author: 'Author 1',
      url: 'http://url.com/1/',
      likes: 3
    }
  ]

  test('Returns the author of the book and the value 1', () => {
    const result = mostBlogs(listWithOneBlog)
    expect(result.author).toBe('Author 1')
    expect(result.blogs).toBe(1)
  })
})

describe('When there are multiple blogs with reoccuring authors', () => {
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
      author: 'Author 1',
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

  test('The author occuring the most times will be returned and with the amount of times he occured', () => {
    const result = mostBlogs(listWithThreeBlogs)
    expect(result.author).toBe('Author 1')
    expect(result.blogs).toBe(2)
  })
})

describe('When there is a large list of blogs', () => {
  const listWithTenBlogs = [
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
      author: 'Author 1',
      url: 'http://url.com/2/',
      likes: 13
    },
    {
      _id: '12345',
      title: 'Blog 3',
      author: 'Author 3',
      url: 'http://url.com/2/',
      likes: 273
    },
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
      author: 'Author 1',
      url: 'http://url.com/2/',
      likes: 13
    },
    {
      _id: '12345',
      title: 'Blog 3',
      author: 'Author 3',
      url: 'http://url.com/2/',
      likes: 273
    },
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
      author: 'Author 1',
      url: 'http://url.com/2/',
      likes: 13
    },
    {
      _id: '12345',
      title: 'Blog 3',
      author: 'Author 3',
      url: 'http://url.com/2/',
      likes: 273
    },
    {
      _id: '123',
      title: 'Blog 1',
      author: 'Author 1',
      url: 'http://url.com/1/',
      likes: 3
    }
  ]

  test('List with ten blogs should return the author of that book and the correct number of blogs', () => {
    const result = mostBlogs(listWithTenBlogs)
    expect(result.author).toBe('Author 1')
    expect(result.blogs).toBe(7)
  })
})
