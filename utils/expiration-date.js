const Warranty = require("../models/Warranty.model")
const Item = require("../models/Item.model")


async function getExpiratonDate(item) {
    try {
        if (!item._id) {
            return null
        }

        const productWarranties = await Warranty.find({ product: item._id }, { durationInMonths: 1 })

        const warrantyStart = item.purchaseDate

        const totalWarrantyInMonth = productWarranties.reduce((acc, warranty) => {
            return acc + warranty.durationInMonths;
        }, 0);

        const expirationDate = new Date(new Date(warrantyStart).setMonth(warrantyStart.getMonth() + totalWarrantyInMonth))

        return expirationDate
    } catch (error) {
        console.error(error)
    }
}

module.exports = getExpiratonDate
