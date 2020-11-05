const router = require("express").Router();

const Video = require("./video");
const Module = require("./module");
const User = require("./user");
const SudahKah = require("./sudahKah");
const Record  =require("./record");
const Emailing  =require("./emailing");
const Batch =require("./batch")
router.use("/module", Module);
router.use("/video", Video);
router.use("/user", User);
router.use("/sudahKah", SudahKah);
router.use("/record", Record);
router.use("/emailing", Emailing);
router.use("/batch", Batch);

module.exports = router;
