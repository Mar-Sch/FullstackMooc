import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()

    const component = render(
        <BlogForm AddNewBlog={createBlog} />
    )

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')
         
    fireEvent.change(author, {
        target: { value: 'Mr complex' }
    }),
    fireEvent.change(title, {
        target: { value: 'Doubtfull about everything' }
    }),
    fireEvent.change(url, {
        target: { value: 'www.wellsee.com' }
    }),

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Doubtfull about everything')
    expect(createBlog.mock.calls[0][0].author).toBe('Mr complex')
    expect(createBlog.mock.calls[0][0].url).toBe('www.wellsee.com')

})

