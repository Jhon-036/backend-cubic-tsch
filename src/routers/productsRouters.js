import express from 'express'
import {getProducts,getProduct,createProduct,updateProduct,deleteProduct} from '../controllers/productsControllers.js'
import upload from '../config/upload.js'
import { apiKey } from '../middleware/apiKey.js'

const router = express.Router()

router.get('/products', apiKey, getProducts)
router.get('/products/:id', getProduct)
router.post('/products', upload.single('image'), createProduct)
router.put('/products/:id', upload.single('image'), updateProduct)
router.delete('/products/:id', deleteProduct)

export default router