const { Thought, User } = require("../models");

const thoughtController = {
  // Get all thoughts
  getThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().sort({ createdAt: -1 });
      res.json(thoughts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve thoughts" });
    }
  },

  // Get single thought by ID
  getSingleThought: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve thought" });
    }
  },

  // Create a new thought
  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "Thought created but no user with this id" });
      }

      res.status(201).json({ message: "Thought successfully created" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create thought" });
    }
  },

  // Update a thought
  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update thought" });
    }
  },

  // Delete a thought
  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndRemove(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "Thought deleted but no user with this id" });
      }

      res.json({ message: "Thought successfully deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete thought" });
    }
  },

  // Add a reaction to a thought
  addReaction: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add reaction" });
    }
  },

  // Remove a reaction from a thought
  removeReaction: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to remove reaction" });
    }
  },
};

module.exports = thoughtController;
