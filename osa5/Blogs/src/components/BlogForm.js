import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({onSubmit, handleLoginFieldChange, newAuthor, newTitle, newUrl}) => (
    <div>
      <h2>Luo uusi blogi</h2>
  
      <form onSubmit={onSubmit}>
      <div>
        title 
        <input
          value={newTitle}
          name="newTitle"
          onChange={handleLoginFieldChange}
        />
        </div>
        <div>
        author 
        <input
          value={newAuthor}
          name="newAuthor"
          onChange={handleLoginFieldChange}
        />
        </div>
        <div>
          url 
        <input
          value={newUrl}
          name="newUrl"
          onChange={handleLoginFieldChange}
        />
        </div>
        <button>tallenna</button>
      </form>
    </div>
  )

  BlogForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleLoginFieldChange: PropTypes.func.isRequired,
    newAuthor: PropTypes.string.isRequired,
    newTitle: PropTypes.string.isRequired
  }

  export default BlogForm