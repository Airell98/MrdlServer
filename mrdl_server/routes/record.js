const router = require("express").Router();
const RecordController = require("../controllers/RecordController");
const authentication = require("../middlewares/authentication");

router.use(authentication);

router.get("/", RecordController.getAllRecordsByUserId)
router.post("/", RecordController.createNewRecord)
router.get("/getAllRecords", RecordController.getAllRecords)


module.exports = router;