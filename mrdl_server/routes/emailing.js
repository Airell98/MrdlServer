const router = require("express").Router();
const EmailingController = require("../controllers/EmailingController");

router.post("/", EmailingController.emailRegister);

router.post("/daftarManual", EmailingController.daftarManual);

router.post("/findOneByEmail", EmailingController.sendEmailRecoverPassword);

router.post("/resendPassword", EmailingController.sendPasswordFromAdmin);
// updatePassword
router.put("/updatePassword", EmailingController.updatePassword);

module.exports = router;
