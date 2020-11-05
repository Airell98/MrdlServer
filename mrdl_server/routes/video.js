const router = require("express").Router();
const VideoController = require("../controllers/VideoController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorizationAdmin");


router.get("/", VideoController.getAllVideos);

router.use(authentication)

router.post("/", VideoController.createVideo);
router.post("/createPPT", VideoController.createPPT);

router.get("/getOneVideo/:videoID", VideoController.getOneVideo);

router.put("/editName/:videoID", authorization, VideoController.editVideoNameByID);

router.put("/editSts/:videoID", authorization,VideoController.editVideoStsByID);

router.put("/editModule/:videoID",authorization, VideoController.editVideoModuleByID);


router.put("/editPPTLink/:videoID", authorization,VideoController.editPPTLinkByID);

router.put("/editLink/:videoID", authorization,VideoController.editVideoLinkByID);

router.put("/editPart/:videoID",authorization, VideoController.editVideoPartByID);

router.put("/editDesc/:videoID",authorization, VideoController.editVideoDescByID);

router.delete("/deleteVideo/:videoID",authorization, VideoController.deleteVideoById);
module.exports = router;