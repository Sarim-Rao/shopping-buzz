import express from "express"
import { login, register,editProfile} from "../controllers/auth.js"

const router = express.Router()



router.post("/login",login)
router.post("/register",register)

router.put("/profile",editProfile)

export default router