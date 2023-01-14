const router = require("express").Router()
const categoryController = require("../controller/categoryController")

router.get('/categories/:categoryId', categoryController.findById);
router.get('/categories', categoryController.fetchAll);
router.post('/category', categoryController.create);
router.post('/category/update', categoryController.update);
router.delete('/category/delete/:categoryId', categoryController.deleteOne);

module.exports = router
 