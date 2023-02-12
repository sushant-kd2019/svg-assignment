exports.swaggerDocument = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "API Documentation",
    description: "API Documentation for SVG assignment.",
    termsOfService: "",
    contact: {
      name: "Sushant Kumar Das",
      email: "sushant2019@iiitkottayam.ac.in",
      url: "https://linkedin.com/in/das-sushant",
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },

  paths: {
    "/games": {
      get: {
        tags: ["Games"],
        summary: "Get all games on platform.",
        responses: {
          200: {
            description: "OK",
            // schema: {
            //   $ref: "#/definitions/Games",
            // },
          },
          500: {
            description: "Internal server Error.",
          },
          404: {
            description: "No games found.",
          },
        },
        parameters: [
          {
            in: "query",
            name: "page",
            description: "Enter page number.",
            type: "integer",
            default: 1,
          },
          {
            in: "query",
            name: "perPage",
            description: "Enter number of documents per page.",
            type: "integer",
            default: 5,
          },
          {
            in: "query",
            name: "sortBy",
            description: "The attribute to be sorted by.",
            type: "string",
            default: "publishedAt",
          },
          {
            in: "query",
            name: "sortOrder",
            description: "ASC/DESC",
            type: "string",
            default: "DESC",
          },
        ],
      },
      post: {
        tags: ["Games"],
        summary: "Create a new game.",
        responses: {
          201: {
            description: "Game created.",
          },
          400: {
            description: "Bad request.",
          },
          422: {
            description: "Resource already exists.",
          },
          500: {
            description: "Internal server error.",
          },
        },
        parameters: [
          {
            in: "body",
            name: "name",
            description: "Enter name of the game.",
            required: "true",
            type: "string",
          },
          {
            in: "body",
            name: "url",
            description: "Enter url of the game.",
            required: "true",
            type: "string",
          },
          {
            in: "body",
            name: "author",
            description: "Enter author of the game.",
            required: "true",
            type: "string",
          },
        ],
      },
    },
    "/games/{gameId}": {
      get: {
        tags: ["Games"],
        summary: "Get individual game.",
        responses: {
          200: {
            description: "OK.",
          },
          400: {
            description: "Invalid gameId.",
          },
          404: {
            description: "Resource(game) does not exist.",
          },
        },
        parameters: [
          {
            in: "path",
            name: "gameId",
            description: "The id of the game.",
            required: "true",
            type: "string",
          },
        ],
      },
      patch: {
        tags: ["Games"],
        summary: "Update individual game.",
        responses: {
          400: {
            description: "Bad request.",
          },
          422: {
            description: "Resource already exists.",
          },
          200: {
            description: "OK.",
          },
          500: {
            description: "Internal server error.",
          },
        },
        parameters: [
          {
            in: "path",
            name: "gameId",
            description: "The id of the game.",
            required: "true",
            type: "string",
          },
          {
            in: "body",
            name: "name",
            description: "Enter new name of the game.",
            required: "false",
            type: "string",
          },
          {
            in: "body",
            name: "url",
            description: "Enter new url of the game.",
            required: "false",
            type: "string",
          },
          {
            in: "body",
            name: "author",
            description: "Enter new author of the game.",
            required: "false",
            type: "string",
          },
        ],
      },
      delete: {
        tags: ["Games"],
        summary: "Delete individual game.",
        responses: {
          200: {
            description: "OK.",
          },
          400: {
            description: "Invalid gameId.",
          },
          404: {
            description: "Resource(game) does not exist.",
          },
        },
        parameters: [
          {
            in: "path",
            name: "gameId",
            description: "The id of the game.",
            required: "true",
            type: "string",
          },
        ],
      },
    },
  },
};
