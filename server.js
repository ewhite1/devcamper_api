const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')
// const logger = require('./middleware/logger')

//load env vars
dotenv.config({path: './config/config.env'})

// connection to Database
connectDB()
//route files
const bootcamps = require('./routes/bootcamps')

const app = express()
// Body parser
app.use(express.json())
// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Mount router
app.use('/api/v1/bootcamps/', bootcamps)
// middleware error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  //close server and exit process
  server.close(() => process.exit(1))
})