const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users.map(User.format))
  })
  
usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
        const user = new User ({
            username: body.username,
            name: body.name,
            password: passwordHash,
            adult: body.adult
        })
        const savedUser = await user.save()
        response.json(user)
        
    }  catch(expection) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }

  })



  module.exports = usersRouter