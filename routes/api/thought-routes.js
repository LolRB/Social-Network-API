const express = require("express");
const router = express.Router();
const thoughtController = require("../../controllers/thought-controller");

// Define routes for thoughts
router.get("/", thoughtController.getThoughts);
router.post("/", thoughtController.createThought);

router.get("/:thoughtId", thoughtController.getSingleThought);
router.put("/:thoughtId", thoughtController.updateThought);
router.delete("/:thoughtId", thoughtController.deleteThought);

// Define routes for reactions
router.post("/:thoughtId/reactions", thoughtController.addReaction);
router.delete(
  "/:thoughtId/reactions/:reactionId",
  thoughtController.removeReaction
);

module.exports = router;
