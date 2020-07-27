const express = require('express')

const routes = express.Router()

const {
	createProduct,
	updateProduct,
	removeProduct,
	indexProduct,
	showProduct}
 = require('./controllers/ProductController')

const {
	createProvider,
	updateProvider,
	removeProvider,
	indexProvider,
	showProvider}
 = require('./controllers/ProviderController')

routes.get('/products',showProduct)
routes.get('/products/:id',indexProduct)
routes.post('/products',createProduct)
routes.put('/products/:id',updateProduct)
routes.delete('/products/:id',removeProduct)

routes.get('/providers',showProvider)
routes.get('/providers/:id',indexProvider)
routes.post('/providers',createProvider)
routes.put('/providers/:id',updateProvider)
routes.delete('/providers/:id',removeProvider)

module.exports = routes