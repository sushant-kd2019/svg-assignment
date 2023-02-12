const GamesDb = require("../models/game");
const util = require("../util");
const { ObjectId } = require("bson");

//create individual game.
exports.createGame = async (req, res) => {
  if (Object.keys(req.body).length === 0)
    return res
      .status(400)
      .send({ message: "body of the request must be present." });
  if (!req.body.name)
    return res
      .status(400)
      .send({ message: "name must be present in the body." });
  if (!req.body.url)
    return res
      .status(400)
      .send({ message: "url must be present in the body." });
  if (!req.body.author)
    return res
      .status(400)
      .send({ message: "author must be present in the body." });

  let gameExists = await GamesDb.find({ url: req.body.url });
  if (gameExists.length > 0)
    return res
      .status(422)
      .send({ message: "A game with that url already exists." });

  try {
    await GamesDb.create({
      name: req.body.name,
      url: req.body.url,
      author: req.body.author,
      publishedDate: new Date(),
    });
  } catch (e) {
    return res.status(500).send({ message: "database error." });
  }
  return res.status(201).send({ message: "game created." });
};

//get all games from database in a paginated response.
exports.getAllGames = async (req, res) => {
  let sortBy = "publishedDate";
  let sortOrder = -1;

  if (req.query.sortBy) {
    sortBy = req.query.sortBy;
  }
  if (req.query.sortOrder === "ASC") {
    sortOrder = 1;
  }

  let metaData = util.paginate(req.query.page, req.query.perPage);
  try {
    var games = await GamesDb.find()
      .sort({ [sortBy]: sortOrder })
      .exec();
  } catch (e) {
    res.status(500).send({ message: "database error." });
  }

  if (games.length == 0)
    return res.status(404).send({ message: "no games found." });

  let response = await util.processMongoData(GamesDb, {}, games, metaData);
  res.status(200).send(response);
};

//get individual game.
exports.getGame = async (req, res) => {
  let gameId = req.params.gameId;
  let gameExists = await ifGameExistsThenReturn(res, gameId);
  if (gameExists.length > 0)
    return res.status(200).send(util.procesMongoObject(gameExists[0]));
};

//update individual game.
exports.updateGame = async (req, res) => {
  let gameId = req.params.gameId;
  let gameExists = await ifGameExistsThenReturn(res, gameId);
  if (gameExists.length == 0) return;
  let updateQuery = {};

  if (Object.keys(req.body).length === 0)
    return res
      .status(400)
      .send({ message: "body of the request must be present." });

  if (req.body.url) {
    let gameWithNewUrlExists = await GamesDb.find({ url: req.body.url });
    if (gameWithNewUrlExists.length > 0)
      return res
        .status(422)
        .send({ message: "A game with the new url already exists." });
    updateQuery.url = req.body.url;
  }

  if (req.body.name) updateQuery.name = req.body.name;
  if (req.body.author) updateQuery.author = req.body.author;
  try {
    await GamesDb.updateOne({ _id: ObjectId(gameId) }, updateQuery);
    return res.status(200).send({ message: "game updated." });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "database error." });
  }
};

//delete individual game.
exports.deleteGame = async (req, res) => {
  let gameId = req.params.gameId;
  let gameExists = await ifGameExistsThenReturn(res, gameId);
  if (gameExists.length == 0) return;

  try {
    await GamesDb.deleteOne({ _id: ObjectId(gameId) });
    return res.status(200).send({ message: "game deleted." });
  } catch (e) {
    res.status(500).send({ message: "database error." });
  }
};

//-------------------------------------------------------------------------------------

//validatiion check for gameId.
ifGameExistsThenReturn = async (res, gameId) => {
  if (!ObjectId.isValid(gameId)) {
    res.status(400).send({ message: "the gameId is invalid." });
    return [];
  }

  let gameExists = await GamesDb.find({ _id: ObjectId(gameId) });
  if (gameExists.length == 0) {
    res
      .status(404)
      .send({ message: "the game with the given gameId does not exist." });
    return [];
  }
  return gameExists;
};
