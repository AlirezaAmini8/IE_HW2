import mongoose from "mongoose"

let userSchema = mongoose.Schema({
    name: String,
    id: Number,
    password: String,
    email: String,
    phone_number: String
   });

   let User = mongoose.model("User", userSchema);

   let studentSchema = mongoose.Schema({
    grade: String,
    entryYear: Number,
    entryTerm: Number,
    average: Number,
    college: String,
    field: String
   });
   let Student = User.discriminator("Student",studentSchema);

   let professorSchema = mongoose.Schema({
    college: String,
    field: String,
    degree: String
   });
   let Professor = User.discriminator("Professor",professorSchema);
   
   let educationalManagerSchema = mongoose.Schema({
    college: String,
   });
   let EducationalManager = User.discriminator("Educational Manager",educationalManagerSchema);

   let ITManagerSchema = mongoose.Schema({
   });
   let ITManager = User.discriminator("IT Manager",ITManagerSchema);

   let approvedCourseSchema = mongoose.Schema({
    name: String,
    prerequisite: Array(String),
    requirement: Array(String),
    Unit: Number,
    field: String
   });

   let approvedCourse = mongoose.model("Approved Course", approvedCourseSchema);
   
   let termCourseSchema = mongoose.Schema({
    classDate: String,
    classTime: String,
    examDate: String,
    examTime: String,
    examLocation: String,
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor'},
    capacity: Number,
    term: String
   });

   let termCourse = approvedCourse.discriminator("Term Course", termCourseSchema);

   export {User, Student, Professor, EducationalManager, ITManager, approvedCourse, termCourse}