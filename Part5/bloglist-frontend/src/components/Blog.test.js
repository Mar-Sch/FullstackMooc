import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

const blog = {
    title: 'I can add a new blog',
    author: 'James Est',
    likes: 1,
    url: 'www.google.fi'
}

test('renders content', () => {
    
    const component = render(
        <Blog blog={blog}/>
    )

    const div = component.container.querySelector(".blog-collapse")

    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveProperty('likes', 1)    
})

test('Clicking show will render url and likes', () => {

    const component = render(
        <Blog blog={blog}/>
    )

    const button = component.getByText('Show')
    fireEvent.click(button)

    const div = component.container.querySelector(".blog-extended")

    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(blog.likes)
})

test('clicking the like button twice, will call the event handler twice ', () => {

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} updateLikes={mockHandler} />
    )

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})


