const express = require("express");
const mechanicRouter = express.Router();
const mechanicController = require("../controllers/mechanicController");
const authenticateToken = require("../middlewares/authenticateToken");
const { uploadMV } = require("../middlewares/multerMiddleware");

mechanicRouter.post(
  "/unlockFeaturesMechanic",
  uploadMV.single("document"),
  mechanicController.unlockFeaturesMechanic
);
mechanicRouter.get(
  "/checkVerificationStatus/:id",
  mechanicController.checkVerificationStatus
);

mechanicRouter.get("/pendingRequests", mechanicController.getPendingRequests);
// router.post('/login', authenticateToken, userController.login);

mechanicRouter.put(
  "/acceptVerificationRequest/:id",
  mechanicController.acceptVerificationRequest
);

mechanicRouter.put(
  "/denyVerificationRequest/:id",
  mechanicController.denyVerificationRequest
);

module.exports = mechanicRouter;
