const router = require("express").Router();
const ModuleController = require("../controllers/ModuleController");

router.get("/", ModuleController.getAllModules);

router.post("/", ModuleController.createModule);

router.put("/module_setting", ModuleController.activateOrDeactivateModule);

router.get("/getOneModule/:module", ModuleController.getOneModule);

router.put("/:moduleID", ModuleController.editOneModuleStatus);



module.exports = router;