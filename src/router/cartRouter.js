const router = require("express").Router()
const cartController = require("../controller/cartController")

router.get('/carts/:cartId', cartController.findById);
router.get('/carts', cartController.fetchAll);
router.post('/cart', cartController.create);
router.post('/cart/update', cartController.update);
router.delete('/cart/delete/:cartId', cartController.deleteOne);

module.exports = router
 