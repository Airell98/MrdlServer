const router = require("express").Router();
const BatchController = require("../controllers/BatchController");

router.get("/", BatchController.getBatch)

router.post("/", BatchController.createBatch);

router.put("/", BatchController.updateBatch);

router.put("/studentGraduation", BatchController.updateUserStatusByBatch);



// router.post("/daftarManual", EmailingController.daftarManual);

// router.post("/findOneByEmail", EmailingController.findOneUserEmail);
// // updatePassword
// router.put("/updatePassword", EmailingController.updatePassword);

module.exports = router;
