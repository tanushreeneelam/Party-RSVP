require('dotenv').config()
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//can protect our routes using this
const auth = require('../middleware/auth')

//user Model 
const User = require('../models/User')

// @route POST /auth
// @des Login user
// @access Public


router.post('/',
  [
    check('email', 'Please provide an email').isEmail(),
    check('password', 'Please provide the password').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' })
      }
      // match password with bcrypt
      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ msg: 'Wrong password!' })
      }

      // sign a jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 36000
      },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )

    } catch (err) {
      console.error(err.message)
      res.status(500).send('server error')
    }

  })


// @route Get /auth
// @des Get user
// @access Private


//protecting this route using auth
//https://blog.webdevsimplified.com/2019-12/express-middleware-in-depth/
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password') //de-selecting the password
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})


module.exports = router