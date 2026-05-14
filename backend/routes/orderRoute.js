import express from 'express'
import { isAdmin, isAuthenticated } from '../middleware/isAuthenticated.js'
import { createOrder, getAllOrder, getMyOrder, getSalesData, getUserOrder, verifyPayment } from '../controller/orderController.js'

const router = express.Router()
router.post("/create-order", isAuthenticated, createOrder)

router.post("/verify-payment", isAuthenticated,  verifyPayment)

router.get("/myOrder", isAuthenticated,  getMyOrder)
router.get("/all", isAuthenticated, isAdmin, getAllOrder)
router.get("/user-order/:userId", isAuthenticated, isAdmin, getUserOrder)
router.get("/sales", isAuthenticated, isAdmin, getSalesData)


export default router;