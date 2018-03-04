import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('not renders all blogs it gets from backend', () => {
    app.update()
    const noteComponents = app.find(Blog)
    expect(noteComponents.length).not.toEqual(blogService.blogs.length)
  })

})
  describe('<App /> test', () => {
    let app
    beforeAll(() => {
        const user = {
            username: 'tester',
            token: '1231231214',
            name: 'Teuvo Testaaja'
          }
          
          localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      app = mount(<App />)
    })
it('renders all blogs it gets from backend', () => {
    

      app.update()
    const noteComponents = app.find(Blog)
    expect(noteComponents.length).toEqual(blogService.blogs.length)
  })
})