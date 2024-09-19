import { response } from "express";
import User from "./Model.js";

// Create a new user
export async function createUser(req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    res
      .status(201)
      .json({
        message: "User created successfully",
        user,
        status: 201,
        success: true,
      }); // Status 201: Created
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Failed to create user",
        error: error.message,
        status: 400,
        success: false,
      }); // Status 400: Bad Request
  }
}

// Get a user by email
export async function getUser(req, res) {
  try {
    const { email } = req.params;
    const user = await User.findOne({ "basicInfo.email": email }); // Search by email
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", status: 404, success: false }); // Status 404: Not Found
    res.status(200).json({
      message: "User retrieved successfully",
      user,
      status: 200,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to retrieve user",
      error: error.message,
      status: 400,
      success: false,
    }); // Status 400: Bad Request
  }
}

// Update a user by email
export async function updateUser(req, res) {
  try {
    const { email } = req.params;
    const updatedUser = await User.findOneAndUpdate(
      { "basicInfo.email": email },
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedUser)
      return res
        .status(404)
        .json({ message: "User not found", status: 404, success: false }); // Status 404: Not Found
    res
      .status(200)
      .json({
        message: "User updated successfully",
        updatedUser,
        status: 200,
        success: true,
      }); // Status 200: OK
  } catch (error) {
    res.status(400).json({
      message: "Failed to update user",
      error: error.message,
      status: 400,
      success: false,
    }); // Status 400: Bad Request
  }
}

// Delete a user by email
export async function deleteUser(req, res) {
  try {
    const { email } = req.params;
    const deletedUser = await User.findOneAndDelete({
      "basicInfo.email": email,
    });
    if (!deletedUser)
      return res
        .status(404)
        .json({ message: "User not found", status: 404, success: false }); // Status 404: Not Found
    res
      .status(200)
      .json({
        message: "User deleted successfully",
        status: 200,
        success: true,
      }); // Status 200: OK
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Failed to delete user",
        error: error.message,
        status: 400,
        success: false,
      }); // Status 400: Bad Request
  }
}
