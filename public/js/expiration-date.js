const Warranty = require("../../models/Warranty.model")


async function warrantyExpirationDate(productId) {
    try {
        const productWithWarranty = await Warranty.find({ product: productId }, { durationInMonths: 1 })
        console.log(productWithWarranty)


        const warrantyStart = new Date(item.purchaseDate)
        // const itemWarranty = await Item.
        const warrantyDurationInMonth = await Warranty.find()
        // (là il faut récupérer toutes les warranties qui ont le même item en ID et les additioner)
        const expirationDate = warrantyStart.setMonth(warrantyStart.getMonth() + warrantyDurationInMonth)
        return expirationDate
    } catch (error) {
        next(error)
    }
}

module.exports = warrantyExpirationDate
