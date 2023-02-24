// import the 3 json files : const users = require(user.json)etc
// require mongoose etc

const mongoose = require('mongoose')
const MONGO_URI =
    'mongodb+srv://AlHitch:YAhSPu3XwTas9PTh@cluster0.tlwwns0.mongodb.net/warrantia?retryWrites=true&w=majority'

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
            await seedUsers()
            await seedItems()
            await seedWarranties()

            await mongoose.disconnect()
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
            warranty.product = item._id;
            const user = await User.findOne({ username: warranty.creator })
            warranty.creator = user._id;
        }
        await Warranty.create(warranties)
    } catch (error) {
        console.log(error);
    }
}
