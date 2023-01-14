const categoryModel = require("../model/categoryModel")

const fetchAll = async (req, res) => {
  const result = await categoryModel.find({});

  res.send(result);
}

const findById = async (req, res) => {
  const categoryId = req.params.categoryId;
  let category;

  try {
    category = await categoryModel.findById(categoryId);
  } catch (err) {
    throw new Error(err)
  }

  if (!category) {
    return res.status(500).json({ error: 'Category not found' })
  }

  return res.send(category);
}

const create = async (req, res) => {
  try {
    const newCategory = new categoryModel(req.body);

    await newCategory.save()
      .then(() => {
        return res.status(201).json(newCategory)
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          message: "An error occured when save category: " + err
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
    const categoryId = req.body["_id"];
    const category = await categoryModel.findById(categoryId);
    
    await category.updateOne(req.body)
      .then(() => {
        return res.status(200).json(req.body)
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          message: "An error occured when update category: " + err
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
  const categoryId = req.params.categoryId;

  try {
    await categoryModel.deleteOne({ "_id": categoryId });
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