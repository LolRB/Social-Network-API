const { User, Thought } = require("../models");

const userController = {
  // Get all users
  getUsers: async (req, res) => {
    try {
      const users = await User.find().select("-__v");
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve users" });
    }
  },

  // Get single user by ID
  getSingleUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId)
        .select("-__v")
        .populate("friends")
        .populate("thoughts");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve user" });
    }
  },

  // Create a new user
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create user" });
    }
  },

  // Update a user
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update user" });
    }
  },

  // Delete a user and associated thoughts
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "User and associated thoughts deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  },

  // Add a friend to the user's friend list
  addFriend: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add friend" });
    }
  },

  // Remove a friend from the user's friend list
  removeFriend: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to remove friend" });
    }
  },
};

module.exports = userController;
