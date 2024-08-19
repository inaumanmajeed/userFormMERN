import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  basicInfo: {
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    gender: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    location: { type: String, required: true },
    nationality: { type: String, required: true },
  },
  educationInfo: {
    highestEducationalQualification: { type: String, required: true },
    collegeUniversity: { type: String, required: true },
    employedIn: { type: String, required: true },
    occupation: { type: String, required: true },
    countryOfResidence: { type: String, required: true },
    annualIncome: { type: Number, required: true },
    workTravel: { type: String, required: true },
    livingWithFamily: { type: String, required: true },
  },
});

const User = model("User", UserSchema);

export default User;
