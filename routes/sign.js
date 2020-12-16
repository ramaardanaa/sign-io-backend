const router = require("express").Router();

const TeachableMachine = require("@sashido/teachablemachine-node");

const model1 = "https://teachablemachine.withgoogle.com/models/SUA1a76YY/";
const modeltest = "https://teachablemachine.withgoogle.com/models/r6BBk-hiN/";

const model = new TeachableMachine({
  modelUrl: model1,
});

router.post("/", async (req, res, next) => {
  console.log("masuk sign.js");
  const { url } = req.body;
  try {
    const predictions = await model.classify({
      imageUrl: url,
    });
    console.log(predictions);
    res.status(200).json({ predictions });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
