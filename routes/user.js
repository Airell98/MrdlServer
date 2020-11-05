const router = require("express").Router();
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorizationAdmin");


router.get("/", UserController.getAllUsers);

router.post("/", UserController.userRegister);

router.get("/:id", UserController.findOneUser)

router.get("/getUsersByRole/:role", UserController.getUsersByRole);

router.get("/getOneUserByEmail/:mymail/:role", UserController.getOneUserByEmail);


router.post("/loginAdmin", UserController.loginAdmin);

router.post("/login", UserController.loginUser);


router.use(authentication)
router.put("/changePassword", UserController.changePassword)

router.put("/edituserNameByID", UserController.edituserNameByID);

router.put("/edituserStsByID", UserController.edituserStsByID);

router.put("/edituserEmailByID", UserController.edituserEmailByID);

router.put("/edituserDomisiliByID", UserController.edituserDomisiliByID);

router.put("/edituserBatchByID", UserController.edituserBatchByID);

// router.put("/edituserPasswordByID", UserController.edituserEmailByID);


router.delete("/:userID", authorization, UserController.deleteUser);




module.exports = router;