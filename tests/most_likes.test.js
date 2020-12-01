const mostLikes = require('../utils/list_helper').mostLikes

describe('When the blog list is empty', () => {
  const emptyBlogList = []

  test('Returns an empty string and 0 likes', () => {
    const result = mostLikes(emptyBlogList)
    expect(result.author).toBe('')
    expect(result.likes).toBe(0)
  })
})

describe('When two blogs with two different authors with the same likes', () => {
  const twoBlogstwoAuthors = [
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
      likes: 3
    }
  ]

  test('Returns the author of the first blog', () => {
    const result = mostLikes(twoBlogstwoAuthors)
    expect(result.author).toBe('Author 1')
    expect(result.likes).toBe(3)
  })
})

describe('When there is three blogs where the same author exists on two of the blogs', () => {

  const listWithThreeBlogsReoccuringAuthorHasMostLikes = [
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
      likes: 127
    },
    {
      _id: '12345',
      title: 'Blog 3',
      author: 'Author 3',
      url: 'http://url.com/2/',
      likes: 24
    }
  ]

  test('Returns the sum of likes from all of Author 1s blogs', () => {
    const result = mostLikes(listWithThreeBlogsReoccuringAuthorHasMostLikes)
    expect(result.author).toBe('Author 1')
    expect(result.likes).toBe(130)
  })
})