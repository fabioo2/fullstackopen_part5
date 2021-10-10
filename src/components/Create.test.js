import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Create from './Create';

test('blog url, author, and likes is shown when the details button is clicked', () => {
    const createBlog = jest.fn();

    const component = render(<Create createBlog={createBlog} />);

    const title = component.container.querySelector('#title');
    const url = component.container.querySelector('#url');
    const form = component.container.querySelector('form');

    fireEvent.change(title, {
        target: { value: 'title of test blog' },
    });

    fireEvent.change(url, {
        target: { value: 'url of test blog' },
    });

    fireEvent.submit(form);
    console.log('hello');
    console.log(createBlog.mock.calls[0][0]);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toBe('title of test blog');
    expect(createBlog.mock.calls[0][1]).toBe('url of test blog');
});
