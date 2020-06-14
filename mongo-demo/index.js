const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => {
    console.log(" Could not connect to MongoDB...", err);
  });

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

// async function createCourse() {
//   const course = new Course({
//     name: "Angular Course",
//     author: "Mosth",
//     tags: ["angular", "frontend"],
//     isPublished: true,
//   });

//   const result = await course
//     .save()
//     .then()
//     .catch((err) => console.log(err));
//   console.log(result);
// }

// createCourse();

// async function getCourses() {
//   const courses = await Course.find({ author: "Mosth", isPublished: true })
//     .limit(10)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1 });
//   console.log(courses);
// }

// getCourses();

async function updateCourse(id) {
  // QUERY FIRST APPROACH
  const course = await Course.findById(id);
  if (!course) return;

  // OPTION 1
  course.isPublished = true;
  course.author = "Another Author";

  // OPTION 2
  //   course.set({
  //     isPublished: true,
  //     author: "Another Author",
  //   });
  const result = await course.save();
  console.log(result);
}

updateCourse('5ee64f3596601438f0951dee');
