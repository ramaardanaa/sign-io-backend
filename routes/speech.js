/* istanbul ignore file */
const router = require("express").Router();
const fs = require("fs");
const speech = require("@google-cloud/speech");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../data-temp/uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".m4a"); //Appending .m4a
  },
});
const upload = multer({ storage: storage });
const linear16 = require("linear16");
const client = new speech.SpeechClient();
router.post("/", upload.single("file"), async (req, res, next) => {
  const { filename } = req.file;
  const fileName = path.join(__dirname, `../data-temp/uploads/${filename}`);

  try {
    const outPath = await linear16(
      fileName,
      path.join(__dirname, `../data-temp/audio-output/${filename}.wav`)
    );
    const file = await fs.readFileSync(outPath);

    const audioBytes = file.toString("base64");

    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
      content: audioBytes,
    };

    const config = {
      encoding: "LINEAR16",
      sampleRateHertz: 16000,
      languageCode: "id-ID",
      // languageCode: "en-US",
      enableAutomaticPunctuation: true,
      enableWordTimeOffsets: false,
      model: "default",
    };

    const request = {
      audio: audio,
      config: config,
    };

    // console.log(request);

    // Detects speech in the audio file

    const [response] = await client.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");
    console.log(response);
    console.log(`Transcription: ${transcription}`);
    fs.unlinkSync(fileName);
    fs.unlinkSync(outPath);
    res.status(200).json({ transcription });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
