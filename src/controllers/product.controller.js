import mongoose from 'mongoose'
import Product from '../models/product'

export const createProduct = async (req, res) => {

    const { title, business, img, price, description, volNeto, additional: { line, format, typeOfTreatment } } = req.body
    const newProduct = new Product({ 
        title,
        business,
        img, 
        price, 
        description, 
        volNeto, 
        additional: { 
            line, 
            format, 
            typeOfTreatment 
        } 
    })

    const productSaved = await newProduct.save()
    res.status(201).json(productSaved)
}

export const getProducts = async(req, res) => {
    try{
        const product = await Product.find()
        res.status(200).json(product)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

export const getProductsById = async(req, res) => {
    try{
        const productId = await Product.findById(req.params.id)
        res.status(200).json(productId)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

export const updateProductById = async(req, res) => {
    const { id } = req.params
    const { title } = req.body
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`The id ${id} not is valid`)
    }
    const product = {title, _id: id}
    await Product.findByIdAndUpdate(id, product, {new: true})
    res.json(product)
}

export const deleteProductById = async(req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`The id ${id} not is valid`)
    }
    await Product.findByIdAndRemove(id)
    res.json({message: 'Deleted successfully'})
}
