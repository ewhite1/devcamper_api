const ErrorResponse = require('../utils/ErrorResponse')

const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message

    // Log error to console
    console.log(err)

    // mMngoose bad ObjectID
    if(err.name === 'CastError'){
        const message = `Resource not found with id of ${err.value}`
        error = new ErrorResponse(message, 404)
    }
    // Mogoose duplucate key
    if(err.code == 11000){
        const message = 'Duplicate field value entered'
        error = new ErrorResponse(message, 400)
    }
    // Mongoose validation error
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })

}

module.exports = errorHandler