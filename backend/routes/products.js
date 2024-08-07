import express from "express"
import  {getAllProducts,getProductsByID} from "../controllers/products.js"


const router = express.Router()



router.get("/",getAllProducts);

router.get("/:id",getProductsByID)


export default router