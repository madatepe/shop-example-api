const userModel = require("../model/userModel")

const fetchAll = async (req, res) => {
  const result = await userModel.find({});

  res.send(result);
}

const findById = async (req, res) => {
  const userId = req.params.userId;
  let user;

  try {
    user = await userModel.findById(userId);
  } catch (err) {
    throw new Error(err)
  }

  if (!user) {
    return res.status(500).json({ error: 'User not found' })
  }

  return res.send(user);
}

const create = async (req, res) => {
  try {
    const newUser = new userModel(req.body);

    await newUser.save()
      .then(() => {
        return res.status(201).json(newUser)
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          message: "An error occured when save user: " + err
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
    const userId = req.body["_id"];
    const user = await userModel.findById(userId);
    
    await user.updateOne(req.body)
      .then((data) => {
        return res.status(200).json(req.body)
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          message: "An error occured when update user: " + err
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
  const userId = req.params.userId;

  try {
    await userModel.deleteOne({ "_id": userId });
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