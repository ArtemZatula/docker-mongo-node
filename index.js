const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose
  .connect("mongodb://artem:pass@mongo:27017?authSource=admin")
  .then(() => console.log("succesfully connected to DB"))
  .catch(e => console.log("Error", e))

app.get('/', (req, res) => {
  res.send('<h2>Hi there!!!</h2>');
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));