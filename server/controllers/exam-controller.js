/* eslint-disable no-undef, arrow-body-style */
const examItem = require('../models/Exam.js');


getItems = async (req, res) => {
  await examItem.find({}, (err, items) => {
    if (err) {
      console.error(`400 in 'getItems': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!items.length) {
      console.error(`404 in 'getItems': Items not found`);
      return res.status(200).json({
        success: true,
        items: [],
      });
    }
    console.log(`200 in 'getItems': Items fetched!`);
    return res.status(200).json({
      success: true,
      items: items,
    });
  }).catch(err => {
    console.error(`caught error in 'getItems': ${err}`);
    console.error(err);
    return res.status(404).json({
      success: false,
      error: err,
    });
  });
};

getItemById = async (req, res) => {
  await  examItem.find({ _id: req.params.id }, (err, items) => {
    if (err) {
      console.error(`400 in 'getItemById': ${err}`);
      throw res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!items.length) {
      console.error(`404 in 'getItemById': Item not found`);
      return res.status(404).json({
        success: false,
        error: 'Item not found',
      });
    }
    console.log(`200 in 'getItemById': Item fetched!`);
    return res.status(200).json({
      success: true,
      item: items[0],
    });
  }).catch(err => {
    console.error(`caught error in 'getItemById': ${err}`);
    console.error(err);
    return err;
  });
};

createItem = (req, res) => {
  const body = req.body;
  // console.log('----------------------- createItem: req -----------------------')
  // console.log(req);
  // console.log('----------------------- createItem: body -----------------------')
  // console.log(body);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an item.',
    });
  }

  const item = new examItem(body);

  if (!item) {
    console.error(`400 in 'createItem': 'item' is malformed.`);
    return res.status(400).json({
      success: false,
      message: "'item' is malformed",
    });
  }

  // console.log('----------------------- createItem: item -----------------------')
  // console.log(item);

  return item
    .save()
    .then(() => {
      console.error(`201 in 'createItem': Item created!`);
      return res.status(201).json({
        success: true,
        id: item._id,
        message: 'Item created!',
      });
    })
    .catch(err => {
      console.error(`caught error in 'createItem'`);
      Object.keys(err.errors).forEach(errorKey => {
        console.error(`ERROR for: ${errorKey}`);
        console.error(
          ` ${
            ((err.errors[errorKey] || {}).properties || {}).message
          }`,
        );
      });
      return res.status(400).json({
        success: false,
        error: err.errors,
        message: err.errors.name,
      });
    });
};

updateItem = async (req, res) => {
  const body = req.body;
  if (!body) {
    console.error(`400 in 'updateItem': You must provide an item to update.`);
    return res.status(400).json({
      success: false,
      error: 'You must provide an item to update.',
    });
  }

  const itemForUpdate = {
    _id: req.params.id,
    name: body.name,
    daysOfWeek: body.daysOfWeek,
    timeframeNote: body.timeframeNote,
    priority: body.priority,
    content: body.content,
  };

  // console.log('----------------------- updateItem: res -----------------------');
  // console.log(res);

  try {
    await examItem.findOneAndUpdate({ _id: req.params.id }, itemForUpdate);
  } catch (err) {
    console.error(`caught error in 'updateItem': ${err}`);
    console.error(err);
    return res.status(400).json({
      success: false,
      error: err,
    });
  }

  console.log(`200 in 'updateItem': Item updated!`);
  return res.status(200).json({
    success: true,
    id: req.params.id,
    message: 'Item updated!',
  });
};

deleteItem = async (req, res) => {
  await examItem.findOneAndDelete({ _id: req.params.id }, (err, item) => {
    if (err) {
      console.error(`400 in 'deleteItem': ${err}`);
      return res.status(400).json({
        succes: false,
        error: err,
      });
    }

    if (!item) {
      console.error(`400 in 'deleteItem': Item not found!`);
      return res.status(400).json({
        success: false,
        error: 'Item not found!',
      });
    }

    return res.status(200).json({
      success: true,
      item: item,
    });
  }).catch(err => {
    console.error(`caught error in 'deleteItem': ${err}`);
    console.error(err);
    return err;
  });
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
