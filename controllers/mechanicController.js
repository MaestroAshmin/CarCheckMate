const MechanicVerification = require("../models/MechanicVerification");
const { ObjectId } = require("mongodb");

const unlockFeaturesMechanic = async (req, res) => {
  try {
    const { licenseLVTNumber, expiryDateLVT, userID } = req.body;
    const filepath = req.file.path;
    console.log(licenseLVTNumber, expiryDateLVT, userID, filepath);
    const newVerificationRequest = new MechanicVerification({
      licenseNumber: licenseLVTNumber,

      expiryDate: expiryDateLVT,

      documentPath: filepath,

      verificationPending: true,

      verificationStatus: false,

      mechanicId: userID,
    });

    newVerificationRequest.save();

    res.status(200).send("Verification Request Made successfully");
  } catch (error) {
    console.log("Error while making mechanic verification request", error);

    res.status(500).send("Error while making mechanic verification request");
  }
};

const checkVerificationStatus = async (req, res) => {
  try {
    const id = req.params.id;

    const userData = await MechanicVerification.findOne({
      mechanicId: id,
    });

    if (userData) {
      res.status(200).json({
        findUser: true,
        userData,
      });
    } else {
      res.status(200).json({
        findUser: false,
      });
    }
  } catch (error) {
    console.log("Error while checking verification status:", error);

    res.status(500).send("Error while checking verification status");
  }
};

const getPendingRequests = async (req, res) => {
  try {
    const response = await MechanicVerification.find({
      verificationPending: true,
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(
      "Error while fetching pending mechanic verification requests",
      error
    );

    res
      .status(500)
      .send("Error while fetching pending mechanic verification requests");
  }
};

const acceptVerificationRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const userRequest = await MechanicVerification.findOne({
      mechanicId: new ObjectId(id),
    });
    if (!userRequest) {
      console.log("user not found");
      res.status(400).send("User not found");
      return;
    }
    userRequest.verificationPending = false;
    userRequest.verificationStatus = true;
    await userRequest.save();
    res.status(200).json({ msg: "request approved" });
  } catch (error) {
    console.log("Error while accepting mechanic verification request", error);

    res.status(500).send("Error while accepting mechanic verification request");
  }
};

const denyVerificationRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const userRequest = await MechanicVerification.findOne({
      mechanicId: new ObjectId(id),
    });
    if (!userRequest) {
      console.log("user not found");
      res.status(400).send("User not found");
      return;
    }
    userRequest.verificationPending = false;
    userRequest.verificationStatus = false;
    await userRequest.save();
    res.status(200).json({ msg: "request denied" });
  } catch (error) {
    console.log("Error while denying mechanic verification request", error);

    res.status(500).send("Error while denying mechanic verification request");
  }
};

module.exports = {
  unlockFeaturesMechanic,
  checkVerificationStatus,
  getPendingRequests,
  acceptVerificationRequest,
  denyVerificationRequest,
};
