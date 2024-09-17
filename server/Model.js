import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  basicInfo: {
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    gender: { type: String, required: false },
    maritalStatus: { type: String, required: false },
    location: { type: String, required: false },
    nationality: { type: String, required: false },
  },
  educationInfo: {
    highestEducationalQualification: { type: String, required: false },
    collegeUniversity: { type: String, required: false },
    employedIn: { type: String, required: false },
    occupation: { type: String, required: false },
    countryOfResidence: { type: String, required: false },
    annualIncome: { type: Number, required: false },
    workTravel: { type: String, required: false },
    livingWithFamily: { type: String, required: false },
  },
});

const User = model("User", UserSchema);

export default User;
