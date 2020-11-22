const morgan = require('morgan')

const requestLogger = morgan('tiny')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}


module.exports = {
    unknownEndpoint,
    requestLogger
}