import mongoose from "mongoose";
const { Schema } = mongoose

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    business: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    volNeto: {
        type: String,
        required: true
    },
    additional: {
        line: {
            type: String,
        },
        format: {
            type: String
        },
        typeOfTreatment: {
            type: String
        },
        required: false
    }
},{
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)
export default Product