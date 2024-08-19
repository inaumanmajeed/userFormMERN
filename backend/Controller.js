import User from "./Model.js";

// Create a new user
export async function createUser(req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Get a user by email
export async function getUser(req, res) {
  try {
    const { email } = req.params;
    const user = await User.findOne({ "basicInfo.email": email }); // Search by email
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
      return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
