const { Schema, model } = require("mongoose");

const warrantySchema = new Schema(
    {
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Item",
            required: true
        },
        warrantyType: {
            type: String,
            enum: ["builder", "seller", "payment", "insurance"],
            required: true
        },
        durationInMonths: {
            type: Number,
            required: true
        },
        provider: {
            type: String,
            required: true,
        },
        policyImg: {
            type: String,
        }
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`    
        timestamps: true
    }
);

const Warranty = model("Warranty", warrantySchema);

module.exports = Warranty;
