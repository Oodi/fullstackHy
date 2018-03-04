import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newTitle: '',
      newAuthor: '',
      newUrl: '',
      error: null,
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    this.setState({user})
    
  }
  } 

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user })
      this.setState({
        error: 'kirjautuminen onnistui',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
}

logout = async (event) => {
  event.preventDefault()
  window.localStorage.clear()
  window.location.reload() 

}

addBlog = (event) => {
  event.preventDefault()
  const blogObject = {
    title: this.state.newTitle,
    author: this.state.newAuthor,
    url: this.state.newUrl,
  }

  blogService
    .create(blogObject)
    .then(newBlog => {
      this.setState({
        blogs: this.state.notes.concat(newBlog),
        newTitle: '', newAuthor: '', newUrl: ''
      })

      this.setState({
        error: 'blogi lisätty',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    })
}



handleLoginFieldChange = (event) => {
  this.setState({ [event.target.name]: event.target.value })
}

  render() {

    const loginForm = () => (
      <div>
        <h2>Kirjaudu</h2>

        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button>kirjaudu</button>
        </form>
      </div>
)

const blogForm = () => (
  <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>
    <BlogForm
      onSubmit={this.addBlog}
      newTitle={this.state.newTitle}
      newAuthor={this.state.newAuthor}
      newUrl={this.state.newUrl}
      handleLoginFieldChange={this.handleLoginFieldChange}
    />
  </Togglable>
)

    if (this.state.user === null) {
      return (
        
        <div>
            <Notification message={this.state.error} />
            {loginForm()}
        </div>
      )
    }

    return (
      <div>
        <h2>blogs</h2>
        <Notification message={this.state.error} />
        <p>{this.state.user.name} logged in</p><form onSubmit={this.logout}><button>kirjaudu ulos</button>
        </form>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
        {blogForm()}
      </div>
    );
  }
}

export default App;
