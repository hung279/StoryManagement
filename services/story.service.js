const httpStatus = require("http-status");
const Story = require("../models/story.model");
const AppError = require("../utils/appError");

const queryStorys = async (filter, options) => {
  const storys = await Story.paginate(filter, options);
  return storys;
};

const createStory = async (storyBody) => {
  return Story.create(storyBody);
};

const getStoryById = async (id) => {
  const story = Story.findById(id);
  if (!story) {
    throw new AppError(httpStatus.NOT_FOUND, "Story not found");
  }
  return story;
};

const updateStoryById = async (storyId, updateBody) => {
  const story = await getStoryById(storyId);

  await Story.findByIdAndUpdate(storyId, updateBody);

  return story;
};

const deleteStoryById = async (storyId) => {
  const story = await getStoryById(storyId);

  await story.remove();
  return story;
};

const getStoryBySlug = async (slug) => {
  const story = story.findOne({ slug });

  return story;
};

module.exports = {
  queryStorys,
  createStory,
  getStoryById,
  updateStoryById,
  deleteStoryById,
  getStoryBySlug,
};
