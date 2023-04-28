const express  = require("express");
const router  = express.Router();
const auth = require("../middleware/auth")
const userControllers = require("./../controllers/user/userControllers")

router.get("/get",  auth, userControllers.controllers.getUser);
router.post("/upload",  auth, userControllers.controllers.uploadProfile);
router.get("/update",  auth, userControllers.controllers.updateUser);

module.exports = router;