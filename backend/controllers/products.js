import products from "../Models/productsModel.js"
import expressAsyncHandler from "express-async-handler"


export const getAllProducts = expressAsyncHandler( async (req,res)=>{
    const product = await products.find({})

    res.json(product)
   
   
})




export const getProductsByID = expressAsyncHandler ( async (req,res) =>{
    const { id } = req.params

    const product = await products.findById(id)

    if(!product){
        res.status(404)
    }
    res.json(product)
})