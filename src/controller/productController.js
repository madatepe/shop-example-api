const productModel = require("../model/productModel")

const fetchAll = async (req, res) => {
  const result = await productModel.find({});

  res.send(result);
}

const findById = async (req, res) => {
  const productId = req.params.productId;
  let product;

  try {
    product = await productModel.findById(productId);
  } catch (err) {
    throw new Error(err)
  }

  if (!product) {
    return res.status(500).json({ error: 'Product not found' })
  }

  return res.send(product);
}

const create = async (req, res) => {
  try {
    const newProduct = new productModel(req.body);

    await newProduct.save()
      .then(() => {
        return res.status(201).json(newProduct)
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          message: "An error occured when save product: " + err
        })
      })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server err"
    })
  }
}

const update = async (req, res) => {
  try {
    const productId = req.body["_id"];
    const product = await productModel.findById(productId);
    
    await product.updateOne(req.body)
      .then(() => {
        return res.status(200).json(req.body)
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          message: "An error occured when update product: " + err
        })
      })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server err"
    })
  }
}

const deleteOne = async (req, res) => {
  const productId = req.params.productId;

  try {
    await productModel.deleteOne({ "_id": productId });
  } catch (err) {
    throw new Error(err)
  }

  return res.send({ success: true });
}

module.exports = {
  findById,
  fetchAll,
  create,
  update,
  deleteOne,
}