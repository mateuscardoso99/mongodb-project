const express = require( 'express')
const cors = require('cors')

const connect = require('./database/index')
const routes = require('./routes')

const app = express()
connect()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(routes)

app.listen(3333,()=>console.log('rodando...'))