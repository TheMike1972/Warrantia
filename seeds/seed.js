// import les 3 fichiers json : const users = require(user.json)etc
// require mongoose etc

const mongoose = require('mongoose')
const MONGO_URI =
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/project-2'

const users = require('./user.json')
const items = require('./item.json')
const warranties = require('./warranty.json')

const User = require('../models/User.model')
const Item = require('../models/Item.model')
const Warranty = require('../models/Warranty.model')


mongoose
    .set('strictQuery', false)
    .connect(MONGO_URI)
    .then(async (x) => {
        try {
            const dbName = x.connections[0].name
            console.log(`Connected to Mongo! Database name: "${dbName}"`)
            // On appelle nos trois fonctions de seed (await seedUser()) dans l'ordre où on les veut
            await seedUsers()
            await seedItems()
            await seedWarranties()

            await mongoose.disconnect()
            console.log('Disconnected after creating users')
        } catch (error) {
            console.error(error)
        }
    })
    .catch((err) => {
        console.error('Error connecting to mongo: ', err)
    })

async function seedUsers() {
    try {
        await User.deleteMany()
        await User.create(users)
    } catch (error) {
        console.log(error);
    }
}

async function seedItems() {
    try {
        await Item.deleteMany()
        // for (const el of array)
        for (const item of items) {
            const user = await User.findOne({ username: item.owner })
            item.owner = user._id;
        }
        await Item.create(items)
    } catch (error) {
        console.log(error);
    }
}

async function seedWarranties() {
    try {
        await Warranty.deleteMany()
        for (const warranty of warranties) {
            const item = await Item.findOne({ name: warranty.product })
            console.log(warranty.product)
            warranty.product = item._id;
        }
        await Warranty.create(warranties)
    } catch (error) {
        console.log(error);
    }
}





    // async function seedUser(), item, warranty

    // seeduser : normal
    // seedItem : on retrouve le user rattaché à l'item pour récupérer son objectID
    // seedWarranties : même topo