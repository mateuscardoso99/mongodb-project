const Provider = require('../models/provider')

const indexProvider = async (req, res) => {
    try{
        const {id} = req.params
        const provider = await Provider.findById(id)
        return res.send(provider)
    }catch(error){
        return res.status(400).send('error to get provider')
    }
}

const showProvider = async (req, res) => {
    try{
        const providers = await Provider.find()
        return res.send(providers)
    }catch(error){
        console.log(error)
        return res.status(400).send('error to get providers')
    }
}

const createProvider = async (req, res) => {
    try{
        await Provider.create(req.body)
        return res.status(201).send('provider created successfully')
    }catch(error){
        return res.status(400).send('error to created')
    }

}

const updateProvider = async (req, res) => {
    try{
        const {id} = req.params
        await Provider.findByIdAndUpdate(id,req.body)
        return res.status(204).send('updated successfully')
    }catch(error){
        return res.status(400).send('error to update provider')
    }
}

const removeProvider = async (req, res) => {
    try{
        const {id} = req.params
        await Provider.findByIdAndDelete(id)
        return res.status(204).send('deleted successfully')
    }catch(error){
        return res.status(400).send('error to delete provider')
    }
}

module.exports = {
    indexProvider,
    showProvider,
    createProvider,
    updateProvider,
    removeProvider}
