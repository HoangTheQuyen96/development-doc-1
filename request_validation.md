```javascript

// user.schema.js
const login = {
  type: "object",
  required: ["password"],
  additionalProperties: false,
  properties: {
    email: { type: "string", format: "email" },
    phoneNumber: { type: "string" },
    password: { type: "string" },
  },
};

const registerByEmail = {
  type: "object",
  additionalProperties: false,
  required: ["name", "password", "email"],
  properties: {
    name: { type: "string", minLength: 2 },
    email: { type: "string", format: "email" },
    password: { type: "string" },
  },
};

// user.routes.js
const validator = require("../middlewares/validator");
const schema = require("../app/schemas/user.schema");
const handler = require("../app/handler");

router.post("/users/login", validator(schema.login), handler.login);
router.post("/users/register", validator(schema.registerByEmail), handler.registerByEmail);
```;
