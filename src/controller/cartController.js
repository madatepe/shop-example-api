const cartModel = require("../model/cartModel")

const fetchAll = async (req, res) => {
  const result = await cartModel.find({});

  res.send(result);
}

const findById = async (req, res) => {
  const cartId = req.params.cartId;
  let cart;

  try {
    cart = await cartModel.findById(cartId);
  } catch (err) {
    throw new Error(err)
  }

  if (!cart) {
    return res.status(500).json({ error: 'Cart not found' })
  }

  return res.send(cart);
}

const create = async (req, res) => {
  try {
    const newCart = new cartModel(req.body);

    await newCart.save()
      .then(() => {
        return res.status(201).json(newCart)
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          message: "An error occured when save cart: " + err
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
    const cartId = req.body["_id"];
    const cart = await cartModel.findById(cartId);
    
    await cart.updateOne(req.body)
      .then(() => {
        return res.status(200).json(req.body)
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          message: "An error occured when update cart: " + err
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
  const cartId = req.params.cartId;

  try {
    await cartModel.deleteOne({ "_id": cartId });
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