
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate("user")
    response.json(blogs.map(Blog.format))
  })
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    
    try {
        
        const token = getTokenFrom(request)
        console.log(jwt)
        console.log(process.env.SECRET)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        console.log("moi")
        if (!token) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        console.log("moi")
        const user = await User.findById(decodedToken.id)
        console.log("moi")
        const blog = new Blog({
            title: body.title,
            author: body.author,
            user: user._id,
            url: body.url,
            likes: 0
        })
  
        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.json(Blog.format(blog))
        
    }  catch (expection) {
            response.status(500).json({ error: 'something went wrong...' })
          
        }

  })

  blogsRouter.delete('/:id', async (request, response) => {
    try {
      await Blog.findByIdAndRemove(request.params.id)
  
      response.status(204).end()
    } catch (exception) {
      console.log(exception)
      response.status(400).send({ error: 'malformatted id' })
    }
  })

  module.exports = blogsRouter