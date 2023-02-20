const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        category: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        purchaseDate: {
            type: Date,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        invoiceImg: [{
            type: String
        }]
    },
    {
        timestamps: true
    }
)
const Item = model("Item", itemSchema);

module.exports = Item;