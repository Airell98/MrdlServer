const router = require("express").Router();
const SudahKahController = require("../controllers/SudahKahController");
const authentication = require("../middlewares/authentication");

router.use(authentication)


router.get("/", SudahKahController.getAllSudahKahByUserID)

router.post("/", SudahKahController.createSudahKah)


module.exports = router