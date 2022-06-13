const httpStatus = require("http-status");
const Story = require("../models/story.model");
const pick = require("../utils/pick");
const { storyService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const addStory = catchAsync(async (req, res, next) => {
  const newStory = await storyService.addStory(req.body);

  res.status(httpStatus.CREATED).json({ status: "success", data: newStory });
});

const getStories = catchAsync(async (req, res, next) => {
  let filter = {};
  const arrQueryFilter = ['name'];
  let searchValue = req.query.search['value'];
  console.log(searchValue);
  arrQueryFilter.forEach((e) => {
    if (searchValue) {
      filter[e] = { $regex: new RegExp(searchValue) };
    }
  });
  console.log(filter);
  let order;
  if(req.query.order === "undefinded") {
    order = "";
  } else {
    let columnIndex = req.query.order[0]['column']; // Column index
    let columnName = req.query.columns[columnIndex]['data']; // Column name
    let columnSortOrder = req.query.order[0]['dir']; // asc or desc
    order = `${columnName}:${columnSortOrder}`;
  }
  
  const options = pick(req.query, ['draw', 'order', 'length', 'start']);
  let page = parseInt(options.start) / parseInt(options.length);

  options['limit'] = options['length'];
  delete options['length'];
  options['page'] = options['start'];
  delete options['start'];
  options['page'] = page + 1;
  options['sortBy'] = options['order'];
  delete options['order'];
  options['sortBy'] = order

  const result = await storyService.queryStorys(filter, options);
  Object.assign(result, { draw: parseInt(options.draw) });

  res.status(httpStatus.OK).json(result);
});

const getStory = catchAsync(async (req, res) => {
  const story = await storyService.getStoryById(req.params.storyId);

  res.status(httpStatus.OK).json({ status: "success", data: story });
});

const updateStory = catchAsync(async (req, res, next) => {
  console.log(req.body, req.params);
  const story = await storyService.updateStoryById(req.params.storyId, req.body);
  console.log(story);
  res
    .status(httpStatus.OK)
    .json({ status: "success", message: "update thành công" });
});

const deleteStory = catchAsync(async (req, res, next) => {
  const story = await storyService.deleteStoryById(req.params.storyId);

  res
    .status(httpStatus.OK)
    .json({ status: "success", message: "delete thành công" });
});

module.exports = {
  addStory,
  getStories,
  getStory,
  updateStory,
  deleteStory,
};
