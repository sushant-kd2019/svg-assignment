const express = require("express");

const router = express.Router();
const gameController = require("../controllers/game.controller");

router.post("/games", gameController.createGame);
router.get("/games", gameController.getAllGames);
router.get("/games/:gameId", gameController.getGame);
router.patch("/games/:gameId", gameController.updateGame);
router.delete("/games/:gameId", gameController.deleteGame);

module.exports = router;
