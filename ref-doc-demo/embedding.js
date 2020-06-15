const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: authorSchema,
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function updateAuthor(courseId) {
  // METHOD 1 of UPDATE
  // const course = await Course.findById(courseId);
  // course.author.name = "Robby";
  // course.save();

  // METHOD 2
  const course = await Course.update(
    { _id: courseId },
    {
      $set: { "author.name": "Roberto" },
    }
  );

  // remove relation (use unset operator)
  // const course = await Course.update(
  //   { _id: courseId },
  //   {
  //     $unset: { "author": "" },
  //   }
  // );
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

// createCourse("Node Course", new Author({ name: "Mosh" }));
updateAuthor("5ee7773fe551715900e055e7");
