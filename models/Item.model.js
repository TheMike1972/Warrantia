const { Schema, model } = require("mongoose");

const userItem = new Schema(
    {
      productType: {
        type: String,
        required: true        
      },   
      productBrand: {
        type: String,
        required:true
      },
      productName: {
        type: String,
        required: true
      },
      purchaseDate: {
        type: Date,
        required: true
      },
      price: {
        type: Number,
        required:true
      },
      warranty: {
        type: Schema.Types.ObjectId,
        ref: 'Warranty',
        required: true
      },
      invoice: [{
        type: String
      }]
    },
    {
        timestamps: true
    }
)
const Item = model("User", userItem);

module.exports = Item;