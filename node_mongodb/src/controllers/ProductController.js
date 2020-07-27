const Product = require('../models/product')

const indexProduct = async (req, res) => {
    try{
        const {id} = req.params
        const product = await Product.findById(id).populate('fornecedor')
        return res.send(product)
    }catch(error){
        return res.status(400).send('error to get product')
    }
}

const showProduct = async (req, res) => {
    try{
        const products = await Product.find().populate('fornecedor')
        return res.send(products)
    }catch(error){
        console.log(error)
        return res.status(400).send('error to get products')
    }
}

const createProduct = async (req, res) => {
    try{
        await Product.create(req.body)
        return res.status(201).send('product created successfully')
    }catch(error){
        return res.status(400).send('error to created')
    }
}

const updateProduct = async (req, res) => {
    try{
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id,req.body)
        return res.status(204).send('updated successfully')
    }catch(error){
        return res.status(400).send('error to update product')
    }
}

const removeProduct = async (req, res) => {
    try{
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        return res.status(204).send('deleted successfully')
    }catch(error){
        return res.status(400).send('error to delete product')
    }
}

module.exports = {
    indexProduct,
    showProduct,
    createProduct,
    updateProduct,
    removeProduct}
