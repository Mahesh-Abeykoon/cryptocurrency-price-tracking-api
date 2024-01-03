const { Signup } = require("../Controllers/AuthControllers");

const router = require("express").Router();

router.post("/signup", Signup);


module.exports = router;