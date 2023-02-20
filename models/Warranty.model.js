const { Schema, model } = require("mongoose");

const warrantySchema = new Schema(
    {
        builderWarranty: Number,
        sellerWarranty: Number,
        paymentWarranty: Number,
        insuranceWarranty: Number,
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`    
        timestamps: true
    }
);

const Warranty = model("Warranty", warrantySchema);

module.exports = Warranty;
