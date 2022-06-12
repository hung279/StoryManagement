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
  // const filter = pick(req.query, ["name", "role"]);
  // const options = pick(req.query, ["sortBy", "limit", "page"]);
  // const stories = await storyService.queryStorys(filter, options);

  // res.status(httpStatus.OK).json(stories);
  let draw = req.query.draw;
  let row = req.query.start;
  let rowperpage = req.query.length; // Rows display per page
  let checkColumnIndex = req.query.order;
  if (typeof checkColumnIndex == "undefined") {
    var columnName = 'score.id'; // Column name
    var columnSortOrder = 'desc'; // asc or desc
  } else {
    let columnIndex = req.query.order[0]['column']; // Column index
    var columnName = req.query.columns[columnIndex]['data']; // Column name
    var columnSortOrder = req.query.order[0]['dir']; // asc or desc
  }

  console.log('columnName' +columnName);

  let filter = {};
  const arrQueryFilter = ['name', 'category', 'author'];
  let searchValue = req.query.search['value'];
  arrQueryFilter.forEach((e) => {
    if (searchValue) {
      filter[e] = { $regex: searchValue };
    }
  });
  // get request parameters start, length
  const options = pick(req.query, ['draw', 'sortBy', 'length', 'start']);
  let page = parseInt(options.start) / parseInt(options.length);

  options['limit'] = options['length'];
  delete options['length'];
  options['page'] = options['start'];
  delete options['start'];
  options['page'] = page + 1;

  const result = await storyService.queryStorys(filter, options);
  Object.assign(result, { draw: parseInt(options.draw) });

  res.json(result);
  // res.status(200).json({
  //   data: result.data,
  //   draw: parseInt(options.draw),
  //   recordsTotal: result.recordsTotal,
  //   recordsFiltered: result.recordsFiltered,
  // });

  // let searchValue = req.query.search['value']; // Search value

  // let searchByTitle = req.query.searchByTitle.trim();
  // let score = req.query.score.trim();
  // let scoreQuery = req.query.scoreQuery.trim();

  // let searchQuery = " ";
  // if (searchByTitle.length > 0) {
  //   searchQuery += ` and (title like '%${searchByTitle}%' ) `;
  // }

  // if (score.length > 0 && scoreQuery.length > 0) {
  //   searchQuery += ` and (score ${scoreQuery} ${score}) `;
  // }

  // if (searchValue.length > 0 && searchByTitle.length == 0) {
  //   searchQuery = ` and (title like '%${searchByTitle}%')`;
  // }

  // let dataQuery = `SELECT * FROM sys_score_game as score  WHERE 1 ${searchQuery} order by ${columnName} ${columnSortOrder} limit ${row},${rowperpage}`;
  // console.log('dataQuery '+dataQuery);

  // var data = [];
  // dataQuery.forEach(function (item) {
  //   let imageHtml = `<img width="100" height="100" src="/images/${item.image}">`;
  //   data.push({
  //     'stt': '',
  //     'image': imageHtml,
  //     'title': item.title,
  //     'description': item.description,
  //     'score': item.score,
  //     'loai_website_id': item.name,
  //     'release_date': moment(new Date(item.release_date)).format("DD-MM-YYYY"),
  //     'created_at': moment(new Date(item.created_at)).format("DD-MM-YYYY HH:mm:ss"),
  //   })
  // });

  // let totalRecords = stories.totalResults;
  // let totalRecordwithFilter = stories.totalResults;
  // var response = {
  //   "draw": draw,
  //   "iTotalRecords": totalRecords,
  //   "iTotalDisplayRecords": totalRecordwithFilter,
  //   "aaData": stories.data,
  // };
  // res.json(response);
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
