import { Router } from 'express'
const router = Router()

import * as productCtrl from '../controllers/product.controller'
import { authJwt } from '../middlewares'

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], productCtrl.createProduct)
router.get('/', productCtrl.getProducts)
router.get('/:id', productCtrl.getProductsById)
router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], productCtrl.updateProductById)
router.delete('/', [authJwt.verifyToken, authJwt.isAdmin], productCtrl.deleteProductById)

export default router