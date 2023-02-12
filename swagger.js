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
            default: "publishedDate",
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
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/definitions/Game",
              },
            },
          },
        },
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
        required: ["gameId"],
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
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/definitions/Game",
              },
            },
          },
        },
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
  definitions: {
    Game: {
      type: "object",
      content: "application/x-www-form-urlencoded",
      properties: {
        name: {
          type: "string",
          description: "Enter new name of the game.",
        },
        url: {
          type: "string",
          description: "Enter new url of the game.",
        },
        author: {
          type: "string",
          description: "Enter new author of the game.",
        },
      },
    },
  },
};
