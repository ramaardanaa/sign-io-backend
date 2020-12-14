if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routes');
const cors = require('cors');

//body parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);

// app.listen(port, () => {
//   console.log(`http://localhost:3000`);
// })

module.exports = app;