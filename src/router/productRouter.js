const router = require("express").Router()
const productController = require("../controller/productController")

router.get('/products/:productId', productController.findById);
router.get('/products', productController.fetchAll);
router.post('/product', productController.create);
router.post('/product/update', productController.update);
router.delete('/product/delete/:productId', productController.deleteOne);

module.exports = router
 