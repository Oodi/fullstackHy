import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'abs'
    }

    const noteComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = noteComponent.find('.content')

    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
  })

  it('clicking the button calls event handler once', () => {
    const blog = {
        title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
        author: 'abs'
      }

    const mockHandler = jest.fn()

    const noteComponent = shallow(
      <SimpleBlog
      blog={blog}
      onClick={mockHandler}
      />
    )

    const button = noteComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })  
})