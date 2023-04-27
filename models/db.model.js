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


   export {User, Student, Professor, EducationalManager}