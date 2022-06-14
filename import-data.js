const fs = require("fs");
const mongoose = require("mongoose");

// TODO: import own module
const User = require("./models/user.model");
const Story = require("./models/story.model");

// TODO: connect to mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/story-management")
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

// TODO: read data from json file
const users = JSON.parse(fs.readFileSync("./database/users.json"));
const stories = JSON.parse(fs.readFileSync("./database/stories.json"));

// TODO: import data to database
const importData = async () => {
  try {
    // await Department.insertMany(departments);
    await User.create(users);
    await Story.create(stories);

    console.log("insert data successfully");
  } catch (error) {
    console.log(error.message);
  }
  process.exit(1);
};

// TODO: delete data to database
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Store.deleteMany();
    console.log("delete data successfully");
  } catch (error) {
    console.log(error.message);
  }
  process.exit(1);
};

// TODO: run script
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
