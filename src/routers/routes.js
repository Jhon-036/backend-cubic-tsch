import express from 'express'
import {getProducts,getProduct,createProduct,updateProduct,deleteProduct} from '../controllers/productsControllers.js'
import {getPosts,getPost,createPost,updatePost,deletePost} from '../controllers/postsController.js'
import { loginUser, registerUser } from '../controllers/usersControllers.js'
import { createOrder, getOrders, getMonthlyOrdersStats  } from '../controllers/orderController.js'
import upload from '../config/upload.js'
import { AuthJwt } from '../middleware/auth.js'

const router = express.Router()

router.post('/auth/login', loginUser)
router.post('/auth/register', registerUser)

router.get('/products', getProducts)
router.get('/products/:id', AuthJwt, getProduct)
router.post('/products', upload.single('image'), AuthJwt, createProduct)
router.put('/products/:id', upload.single('image'), AuthJwt, updateProduct)
router.delete('/products/:id', AuthJwt, deleteProduct)

router.get('/posts', getPosts)
router.get('/posts/:id', AuthJwt, getPost)
router.post('/posts', upload.single('image'), AuthJwt, createPost)
router.put('/posts/:id', upload.single('image'), AuthJwt, updatePost)
router.delete('/posts/:id', AuthJwt, deletePost)

router.get('/orders', getOrders)
router.get('/orders/stats/month', AuthJwt, getMonthlyOrdersStats )
router.post('/orders', createOrder)

export default router

// No Auth login register /products /posts /orders create/orders