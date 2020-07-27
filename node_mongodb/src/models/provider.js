const mongoose = require('mongoose')

const ProviderSchema = new mongoose.Schema({
    descricao: {
        type: String,
        require: true,
    },
    cidade: {
        type: String,
        require: true,
    },
    estado: {
        type: String,
        require: true,
    }
})

const Provider = mongoose.model('Provider', ProviderSchema)
module.exports = Provider