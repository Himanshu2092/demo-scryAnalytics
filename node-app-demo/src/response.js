const sendSuccess = (config) => {
const {res, message, data} = config
res.status(200).send({ code: 200, message: message || 'Successfull', data: data || {}});
}

const sendForbidden = (config) => {
    const {res, message} = config
    res.status(403).send({ code: 403, message: message || ''});
}

const sendFailure = (config) => {
    const {res, message} = config
    res.status(500).send({ code: 500, message: message || ''});
}

const sendNotFound = (config) => {
    const {res, message} = config
    res.status(404).send({ code: 404, message: message || 'Not Found'});
}

const sendInvalidFormat = (config) => {
    const {res, message} = config
    res.status(422).send({ code: 422, message: message || 'Not Found'});
}

module.exports = {
    sendSuccess,
    sendForbidden,
    sendFailure,
    sendNotFound,
    sendInvalidFormat
}