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
    authors: { type: [authorSchema], required: true },
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
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

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}
// createCourse("Node Course", [
//   new Author({ name: "Mosh" }),
//   new Author({ name: "Rob" }),
// ]);
// updateAuthor("5ee7773fe551715900e055e7");
// addAuthor("5ee77a9085995e43644886cd", new Author({ name: "Bob" }));
removeAuthor("5ee77a9085995e43644886cd", "5ee77af1ef74cf5518745e4f");
