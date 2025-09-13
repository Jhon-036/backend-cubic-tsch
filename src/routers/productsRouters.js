import express from 'express'
import {getProducts,getProduct,createProduct,updateProduct,deleteProduct} from '../controllers/productsControllers.js'
import upload from '../config/upload.js'

const router = express.Router()

router.get('/products', getProducts)
router.get('/products/:id', getProduct)
router.post('/products', upload.single('image'), createProduct)
router.put('/products/:id', upload.single('image'), updateProduct)
router.delete('/products/:id', deleteProduct)

export default router