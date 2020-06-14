const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => {
    console.log(" Could not connect to MongoDB...", err);
  });

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Mosth",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  try {
    // TRIGGER VALIDATION MANUALLY
    // course.validate((err) => {
    //   if (err) {
    //   }
    // });
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }

  //   const result = await course
  //     .save()
  //     .then()
  //     .catch((err) => console.log(err));
  //   console.log(result);
}

createCourse();

// async function getCourses() {
//   const courses = await Course.find({ author: "Mosth", isPublished: true })
//     .limit(10)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1 });
//   console.log(courses);
// }

// getCourses();

// async function updateCourse(id) {
//   // UPDATE FIRST APPROACH - OPTION 1 (DOESN'T RETURN OBJ)
//   const result = await Course.update(
//     { _id: id },
//     { $set: { author: "Bob", isPublished: false } }
//   );
//   console.log(result);

//   // UPDATE FIRST APPROACH - OPTION 2 (CAN RETURN OLD OR NEW OBJ)
//   const course = await Course.findByIdAndUpdate(
//     id,
//     {
//       $set: { author: "Bobby", isPublished: false },
//     },
//     { new: true }
//   );
//   console.log(course);
// }

// updateCourse("5ee64f3596601438f0951dee");

// async function removeCourse(id) {
//   // DELETE FIRST APPROACH - OPTION 1 (DOESN'T RETURN OBJ)
//   //   const result = await Course.deleteOne({ _id: id });
//   //   console.log(result);

//   // DELETE FIRST APPROACH - OPTION 2 (RETURN OBJ)
//   const course = await Course.findByIdAndRemove(id);
//   console.log(course);
// }

// removeCourse("5ee64f3596601438f0951dee");
