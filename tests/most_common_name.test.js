const mostBlogs = require('../utils/list_helper').mostBlogs

describe('Favorite blog test', () => {
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
    
    test('some test', () => {
        const result = mostBlogs(listWithThreeBlogs)
        expect(result.author).toBe('Author 1')
        expect(result.blogs).toBe(2)
    })
})