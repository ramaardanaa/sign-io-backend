const router = require("express").Router();

const TeachableMachine = require("@sashido/teachablemachine-node");

const model1 = "https://teachablemachine.withgoogle.com/models/SUA1a76YY/";
const modeltest = "https://teachablemachine.withgoogle.com/models/r6BBk-hiN/";

const model = new TeachableMachine({
  modelUrl: model1,
  // modelUrl: modeltest,
});

router.post("/", async (req, res, next) => {
  console.log("masuk sign.js");
  const { url } = req.body;
  console.log(url);
  try {
    // const image = await load(url)
    const predictions = await model.classify({
      // imageUrl:
      //   "https://sign-io.s3.ap-southeast-1.amazonaws.com/1608128952552-1608128952685.jpeg",
      // imageUrl:
      //   "https://tensorflow-a-e.s3.jp-tok.cloud-object-storage.appdomain.cloud/DOG.png",
      // imageUrl:
      //   "https://tensorflow-a-e.s3.jp-tok.cloud-object-storage.appdomain.cloud/1608170751038-1608170750972.jpeg",
      // ini file baru
      // "https://sign-io-storage.s3-ap-southeast-1.amazonaws.com/DOG.png",
      imageUrl: url,
    });
    console.log(predictions);
    let result;
    let num = 0;
    predictions?.forEach((value) => {
      if (value.score >= 0 && value.score <= 1) {
        if (value.score > num) {
          num = value.score;
          result = value.class;
        }
      }
    });
    console.log("result", result);
    res.status(200).json({ predictions: result });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
