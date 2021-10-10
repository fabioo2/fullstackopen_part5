import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('renders blog title and author but does not render url or number of likes', () => {
    const user = {
        id: 1,
    };

    const blog = {
        title: 'test blog',
        author: 'tester man',
        url: 'www.teststestests.com',
        user: {
            id: 1,
        },
    };

    const mockAddLikeHandler = jest.fn();
    const mockDeleteLikeHandler = jest.fn();

    const component = render(<Blog blog={blog} addLike={mockAddLikeHandler} deleteBlog={mockDeleteLikeHandler} user={user} />);
    const div = component.container.querySelector('.togglableContent');

    expect(div).toHaveStyle('display: none');
    expect(div).toHaveTextContent('tester man');
    expect(div).toHaveTextContent('www.teststestests.com');
    expect(div).toHaveTextContent('likes: ');
    expect(div).not.toHaveTextContent('test blog');
});

test('blog url, author, and likes is shown when the details button is clicked', () => {
    const user = {
        id: 1,
    };

    const blog = {
        title: 'test blog',
        author: 'tester man',
        url: 'www.teststestests.com',
        user: {
            id: 1,
        },
    };

    const mockAddLikeHandler = jest.fn();
    const mockDeleteLikeHandler = jest.fn();

    const component = render(<Blog blog={blog} addLike={mockAddLikeHandler} deleteBlog={mockDeleteLikeHandler} user={user} />);
    const div = component.container.querySelector('.togglableContent');
    const button = component.container.querySelector('button');
    fireEvent.click(button);

    expect(div).toHaveTextContent('tester man');
    expect(div).toHaveTextContent('www.teststestests.com');
    expect(div).toHaveTextContent('likes: ');
    expect(div).not.toHaveStyle('display: none');
});

test('when like button is clicked twice event handler is called twice', () => {
    const user = {
        id: 1,
    };

    const blog = {
        title: 'test blog',
        author: 'tester man',
        url: 'www.teststestests.com',
        user: {
            id: 1,
        },
    };

    const mockAddLikeHandler = jest.fn();
    const mockDeleteLikeHandler = jest.fn();

    const component = render(<Blog blog={blog} addLike={mockAddLikeHandler} deleteBlog={mockDeleteLikeHandler} user={user} />);

    const button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockAddLikeHandler.mock.calls).toHaveLength(2);
});
