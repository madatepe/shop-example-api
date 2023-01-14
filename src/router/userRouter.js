const router = require("express").Router()
const userController = require("../controller/userController")

router.get('/users/:userId', userController.findById);
router.get('/users', userController.fetchAll);
router.post('/user', userController.create);
router.post('/user/update', userController.update);
router.delete('/user/delete/:userId', userController.deleteOne);

module.exports = router
 