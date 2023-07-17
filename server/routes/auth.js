const express = require("express");

const router = express.Router();

//middlewares
const { authCheck } = require("../middleware/auth");

//controllers
const { createOrUpdateUser, currentUser } = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);

router.post("/current-user", authCheck, currentUser);

module.exports = router;
