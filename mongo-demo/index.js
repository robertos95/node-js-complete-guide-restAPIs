const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => {
    console.log(" Could not connect to MongoDB...", err);
  });

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxLength: 255,
    // match: /pattern/,
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          // Do some async work
          const result = v && v.length > 0;
          callback(result);
        }, 1000);
      },
      message: "A course should have at least one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    category: "-",
    author: "Mosth",
    // tags: ["angular", "frontend"],
    isPublished: true,
    price: 10,
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
    for (field in ex.errors) console.log(ex.errors[field].message);
    // console.log(ex.message);
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
