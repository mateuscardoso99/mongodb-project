const mongoose = require('mongoose')

const uri = 'mongodb+srv://<user>:<password>@cluster0.h3srq.mongodb.net/cluster0?retryWrites=true&w=majority'
const connect = async () => {
    await mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    console.log('connected in mlab cloud database.')
}

module.exports = connect
