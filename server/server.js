const express = require('express')
const app = express()
const connectDB = require('./config/db')

//connect to database 
connectDB()

//Init Middlewares
app.use(express.json({ extended: false }))

app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/guests', require('./routes/guests'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started at port ${PORT}`))