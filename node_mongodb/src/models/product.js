const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    descricao: {
        type: String,
        require: true,
    },
    categoria: {
        type: String,
        require: true,
    },
    fornecedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        require: true,
    },
    margemlucro: {
        type: Number,
        require: true,
    },
    preco: {
        type: Number,
        require: true,
    },
    quantidade: {
        type: Number,
        require: true,
    }
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product