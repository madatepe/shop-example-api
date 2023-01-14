const router = require("express").Router()
const orderController = require("../controller/orderController")

router.get('/orders/:orderId', orderController.findById);
router.get('/orders', orderController.fetchAll);
router.post('/order', orderController.create);
router.post('/order/update', orderController.update);
router.delete('/order/delete/:orderId', orderController.deleteOne);

module.exports = router
 